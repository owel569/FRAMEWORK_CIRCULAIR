
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Company, Score } from '@prisma/client';

interface QuestionResponse {
  id: string;
  value: number;
}

interface DimensionResponses {
  governance?: QuestionResponse[];
  economic?: QuestionResponse[];
  social?: QuestionResponse[];
  environmental?: QuestionResponse[];
}

interface ScoreCalculationResult {
  globalScore: number;
  governanceScore: number;
  economicScore: number;
  socialScore: number;
  environmentalScore: number;
}

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateScore(companyId: string, responses: DimensionResponses): Promise<Score> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId }
    });

    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const scores = this.calculateAllScores(responses, company);
    
    const score = await this.prisma.score.create({
      data: {
        companyId,
        globalScore: scores.globalScore,
        governanceScore: scores.governanceScore,
        economicScore: scores.economicScore,
        socialScore: scores.socialScore,
        environmentalScore: scores.environmentalScore,
        responses: JSON.stringify(responses),
      },
    });

    return score;
  }

  private calculateAllScores(
    responses: DimensionResponses,
    company: Company
  ): ScoreCalculationResult {
    const governanceScore = this.calculateDimensionScore(responses.governance ?? []);
    const economicScore = this.calculateEnhancedEconomicScore(responses.economic ?? [], company);
    const socialScore = this.calculateEnhancedSocialScore(responses.social ?? [], company);
    const environmentalScore = this.calculateEnhancedEnvironmentalScore(
      responses.environmental ?? [],
      company
    );
    
    const globalScore = Number(
      ((governanceScore + economicScore + socialScore + environmentalScore) / 4).toFixed(2)
    );

    return {
      globalScore,
      governanceScore: Number(governanceScore.toFixed(2)),
      economicScore: Number(economicScore.toFixed(2)),
      socialScore: Number(socialScore.toFixed(2)),
      environmentalScore: Number(environmentalScore.toFixed(2)),
    };
  }

  private calculateEnhancedEconomicScore(
    answers: QuestionResponse[],
    company: Company
  ): number {
    let baseScore = this.calculateDimensionScore(answers);
    
    if (company.pourcentageValorisation !== null && company.pourcentageValorisation !== undefined) {
      const bonusValorisation = (company.pourcentageValorisation / 100) * 15;
      baseScore = Math.min(100, baseScore + bonusValorisation);
    }
    
    if (company.partAchatsLocaux !== null && company.partAchatsLocaux !== undefined) {
      const bonusLocal = (company.partAchatsLocaux / 100) * 10;
      baseScore = Math.min(100, baseScore + bonusLocal);
    }
    
    return baseScore;
  }

  private calculateEnhancedSocialScore(
    answers: QuestionResponse[],
    company: Company
  ): number {
    let baseScore = this.calculateDimensionScore(answers);
    
    if (company.partEmploisLocaux !== null && company.partEmploisLocaux !== undefined) {
      const bonusEmploi = (company.partEmploisLocaux / 100) * 15;
      baseScore = Math.min(100, baseScore + bonusEmploi);
    }
    
    if (company.heuresFormation !== null && company.heuresFormation !== undefined) {
      const bonusFormation = (Math.min(20, company.heuresFormation) / 20) * 10;
      baseScore = Math.min(100, baseScore + bonusFormation);
    }
    
    return baseScore;
  }

  private calculateEnhancedEnvironmentalScore(
    answers: QuestionResponse[],
    company: Company
  ): number {
    let baseScore = this.calculateDimensionScore(answers);
    
    if (
      company.emissionsScope12 !== null &&
      company.emissionsScope12 !== undefined &&
      company.employeeCount !== null &&
      company.employeeCount !== undefined &&
      company.employeeCount > 0
    ) {
      const emissionsParEmploye = company.emissionsScope12 / company.employeeCount;
      
      if (emissionsParEmploye < 5) {
        baseScore = Math.min(100, baseScore + 15);
      } else if (emissionsParEmploye < 10) {
        baseScore = Math.min(100, baseScore + 10);
      } else if (emissionsParEmploye < 15) {
        baseScore = Math.min(100, baseScore + 5);
      }
    }
    
    if (
      company.dechetsDangereux !== null &&
      company.dechetsDangereux !== undefined &&
      company.dechetsTotaux !== null &&
      company.dechetsTotaux !== undefined &&
      company.dechetsTotaux > 0
    ) {
      const ratioDechetsDangereux = (company.dechetsDangereux / company.dechetsTotaux) * 100;
      if (ratioDechetsDangereux < 5) {
        baseScore = Math.min(100, baseScore + 10);
      }
    }
    
    return baseScore;
  }

  private calculateDimensionScore(answers: QuestionResponse[]): number {
    if (!answers || answers.length === 0) {
      return 0;
    }
    
    const total = answers.reduce((sum, answer) => {
      const value = Number(answer.value) || 0;
      return sum + value;
    }, 0);
    
    return Number(((total / (answers.length * 5)) * 100).toFixed(2));
  }

  async getCompanyScores(companyId: string): Promise<Score[]> {
    return this.prisma.score.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      include: {
        actionPlan: true,
      },
    });
  }

  async getScore(id: string): Promise<any> {
    const score = await this.prisma.score.findUnique({
      where: { id },
      include: {
        company: true,
        actionPlan: true,
      },
    });
    
    if (!score) {
      return null;
    }

    return {
      ...score,
      responses: JSON.parse(score.responses),
      actionPlan: score.actionPlan
        ? {
            ...score.actionPlan,
            recommendations: JSON.parse(score.actionPlan.recommendations),
          }
        : null,
    };
  }
}
