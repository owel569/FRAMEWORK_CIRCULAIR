
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
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

  constructor(private readonly prisma: PrismaService) {}

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
        name: admin.name,
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

  // Statistiques du tableau de bord
  async getDashboardStats(): Promise<AdminStatsDto> {
    const [
      totalCompanies,
      totalScores,
      totalQuestions,
      recentCompanies,
      scoresByMonth,
      sectorDistribution,
      averageScores,
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
    ]);

    return {
      totalCompanies,
      totalScores,
      totalQuestions,
      recentCompanies,
      scoresByMonth,
      sectorDistribution,
      averageScores,
    };
  }

  private async getScoresByMonth() {
    const scores = await this.prisma.score.findMany({
      select: {
        createdAt: true,
        globalScore: true,
      },
    });

    const monthlyData: { [key: string]: number } = {};
    scores.forEach((score) => {
      const month = score.createdAt.toISOString().slice(0, 7);
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
    }));
  }

  private async getSectorDistribution() {
    const companies = await this.prisma.company.groupBy({
      by: ['sector'],
      _count: true,
    });

    return companies.map((item) => ({
      sector: item.sector,
      count: item._count,
    }));
  }

  private async getAverageScores() {
    const scores = await this.prisma.score.aggregate({
      _avg: {
        globalScore: true,
        governanceScore: true,
        economicScore: true,
        socialScore: true,
        environmentalScore: true,
      },
    });

    return {
      global: scores._avg.globalScore || 0,
      governance: scores._avg.governanceScore || 0,
      economic: scores._avg.economicScore || 0,
      social: scores._avg.socialScore || 0,
      environmental: scores._avg.environmentalScore || 0,
    };
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
