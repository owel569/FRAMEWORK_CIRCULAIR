import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DemoDataService } from './demo-data.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { 
  AdminLoginDto, 
  CreateQuestionDto, 
  UpdateQuestionDto,
  AdminStatsDto
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'circular-economy-secret-key-2025';
  private useDemoData: boolean = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly demoDataService: DemoDataService,
  ) {}

  // Authentification
  async login(data: AdminLoginDto): Promise<{ token: string; admin: any }> {
    const admin = await this.prisma.adminUser.findUnique({
      where: { email: data.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const isPasswordValid = await bcrypt.compare(data.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: `${admin.firstName} ${admin.lastName}`,
        role: admin.role,
      },
    };
  }

  // Vérification du token
  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch {
      throw new UnauthorizedException('Token invalide');
    }
  }

  setDemoMode(enabled: boolean) {
    this.useDemoData = enabled;
    return { demoMode: this.useDemoData };
  }

  getDemoMode() {
    return { demoMode: this.useDemoData };
  }

  async getDashboardStats(): Promise<AdminStatsDto> {
    if (this.useDemoData) {
      return this.demoDataService.getDemoStats();
    }

    const [
      totalCompanies,
      totalScores,
      totalQuestions,
      recentCompanies,
      scoresByMonth,
      sectorDistribution,
      averageScores,
      performanceTrends,
      topPerformers,
    ] = await Promise.all([
      this.prisma.company.count(),
      this.prisma.score.count(),
      this.prisma.questionnaireQuestion.count(),
      this.prisma.company.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          scores: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      this.getScoresByMonth(),
      this.getSectorDistribution(),
      this.getAverageScores(),
      this.getPerformanceTrends(),
      this.getTopPerformers(),
    ]);

    return {
      totalCompanies,
      totalScores,
      totalQuestions,
      recentCompanies,
      scoresByMonth,
      sectorDistribution,
      averageScores,
      performanceTrends,
      topPerformers,
    };
  }

  private async getScoresByMonth() {
    const scores = await this.prisma.score.findMany({
      select: {
        createdAt: true,
        overallScore: true,
      },
    });

    const monthlyData: { [key: string]: { count: number; totalScore: number } } = {};
    scores.forEach((score) => {
      const month = score.createdAt.toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { count: 0, totalScore: 0 };
      }
      monthlyData[month].count += 1;
      monthlyData[month].totalScore += score.overallScore;
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      count: data.count,
      averageScore: data.totalScore / data.count,
    }));
  }

  private async getSectorDistribution() {
    const companies = await this.prisma.company.findMany({
      include: {
        scores: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const sectorData: { [key: string]: { count: number; totalScore: number; scoreCount: number } } = {};

    companies.forEach((company) => {
      if (!sectorData[company.sector]) {
        sectorData[company.sector] = { count: 0, totalScore: 0, scoreCount: 0 };
      }
      sectorData[company.sector].count += 1;

      if (company.scores.length > 0) {
        sectorData[company.sector].totalScore += company.scores[0].overallScore;
        sectorData[company.sector].scoreCount += 1;
      }
    });

    return Object.entries(sectorData).map(([sector, data]) => ({
      sector,
      count: data.count,
      averageScore: data.scoreCount > 0 ? data.totalScore / data.scoreCount : 0,
    }));
  }

  private async getAverageScores() {
    const scores = await this.prisma.score.aggregate({
      _avg: {
        overallScore: true,
        governanceScore: true,
        economicScore: true,
        socialScore: true,
        environmentalScore: true,
      },
    });

    return {
      global: scores._avg.overallScore || 0,
      governance: scores._avg.governanceScore || 0,
      economic: scores._avg.economicScore || 0,
      social: scores._avg.socialScore || 0,
      environmental: scores._avg.environmentalScore || 0,
    };
  }

  private async getPerformanceTrends() {
    const scores = await this.prisma.score.findMany({
      select: {
        createdAt: true,
        governanceScore: true,
        economicScore: true,
        socialScore: true,
        environmentalScore: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const monthlyTrends: { 
      [key: string]: { 
        governance: number[];
        economic: number[];
        social: number[];
        environmental: number[];
      } 
    } = {};

    scores.forEach((score) => {
      const month = score.createdAt.toISOString().slice(0, 7);
      if (!monthlyTrends[month]) {
        monthlyTrends[month] = {
          governance: [],
          economic: [],
          social: [],
          environmental: [],
        };
      }
      monthlyTrends[month].governance.push(score.governanceScore);
      monthlyTrends[month].economic.push(score.economicScore);
      monthlyTrends[month].social.push(score.socialScore);
      monthlyTrends[month].environmental.push(score.environmentalScore || 0);
    });

    return Object.entries(monthlyTrends)
      .map(([month, data]) => ({
        month,
        governance: data.governance.reduce((a, b) => a + b, 0) / data.governance.length,
        economic: data.economic.reduce((a, b) => a + b, 0) / data.economic.length,
        social: data.social.reduce((a, b) => a + b, 0) / data.social.length,
        environmental: data.environmental.reduce((a, b) => a + b, 0) / data.environmental.length,
      }))
      .slice(-6);
  }

  private async getTopPerformers() {
    const companies = await this.prisma.company.findMany({
      include: {
        scores: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const performers = companies
      .filter((c) => c.scores.length > 0)
      .map((c) => ({
        companyName: c.name,
        sector: c.sector,
        overallScore: c.scores[0].overallScore,
      }))
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, 10)
      .map((p, index) => ({
        ...p,
        rank: index + 1,
      }));

    return performers;
  }

  async getCompanyDetails(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        scores: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!company) {
      throw new Error('Entreprise non trouvée');
    }

    const scoreProgression = company.scores.length >= 2
      ? company.scores[0].overallScore - company.scores[company.scores.length - 1].overallScore
      : 0;

    return {
      id: company.id,
      name: company.name,
      sector: company.sector,
      email: company.email,
      size: company.size,
      createdAt: company.createdAt,
      scores: company.scores,
      totalEvaluations: company.scores.length,
      scoreProgression,
    };
  }

  async searchCompanies(query: string) {
    return this.prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
          { sector: { contains: query } },
        ],
      },
      include: {
        scores: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      take: 20,
    });
  }

  // Gestion des questions
  async getAllQuestions() {
    return this.prisma.questionnaireQuestion.findMany({
      orderBy: [{ sector: 'asc' }, { category: 'asc' }],
    });
  }

  async getQuestionsBySector(sector: string) {
    return this.prisma.questionnaireQuestion.findMany({
      where: { sector },
      orderBy: { category: 'asc' },
    });
  }

  async createQuestion(data: CreateQuestionDto) {
    return this.prisma.questionnaireQuestion.create({
      data: {
        questionId: data.questionId,
        sector: data.sector,
        category: data.category,
        text: data.text,
        type: data.type,
        weight: data.weight,
        unit: data.unit,
        choices: data.choices ? JSON.stringify(data.choices) : null,
        isoReference: data.isoReference,
      },
    });
  }

  async updateQuestion(id: string, data: UpdateQuestionDto) {
    return this.prisma.questionnaireQuestion.update({
      where: { id },
      data: {
        text: data.text,
        type: data.type,
        weight: data.weight,
        unit: data.unit,
        choices: data.choices ? JSON.stringify(data.choices) : null,
        isoReference: data.isoReference,
      },
    });
  }

  async deleteQuestion(id: string) {
    return this.prisma.questionnaireQuestion.delete({
      where: { id },
    });
  }

  // Import/Export bulk de questions
  async bulkImportQuestions(questions: CreateQuestionDto[]) {
    const results = [];
    for (const q of questions) {
      try {
        const result = await this.prisma.questionnaireQuestion.create({
          data: {
            questionId: q.questionId,
            sector: q.sector,
            category: q.category,
            text: q.text,
            type: q.type,
            weight: q.weight,
            unit: q.unit,
            choices: q.choices ? JSON.stringify(q.choices) : null,
            isoReference: q.isoReference,
          },
        });
        results.push(result);
      } catch (error) {
        // Ignore duplicates
        if (!error.code || error.code !== 'P2002') {
          throw error;
        }
      }
    }
    return { count: results.length };
  }

  async exportQuestions(sector?: string) {
    const where = sector ? { sector } : {};
    return this.prisma.questionnaireQuestion.findMany({ where });
  }
}