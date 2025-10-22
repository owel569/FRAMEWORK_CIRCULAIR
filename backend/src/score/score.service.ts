import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async calculateScore(companyId: string, responses: any) {
    const governanceScore = this.calculateDimensionScore(responses.governance || []);
    const economicScore = this.calculateDimensionScore(responses.economic || []);
    const socialScore = this.calculateDimensionScore(responses.social || []);
    const environmentalScore = this.calculateDimensionScore(responses.environmental || []);
    
    const globalScore = (governanceScore + economicScore + socialScore + environmentalScore) / 4;

    const score = await this.prisma.score.create({
      data: {
        companyId,
        globalScore,
        governanceScore,
        economicScore,
        socialScore,
        environmentalScore,
        responses: JSON.stringify(responses),
      },
    });

    return score;
  }

  private calculateDimensionScore(answers: any[]): number {
    if (!answers || answers.length === 0) return 0;
    
    const total = answers.reduce((sum, answer) => {
      const value = parseInt(answer.value) || 0;
      return sum + value;
    }, 0);
    
    return (total / (answers.length * 5)) * 100;
  }

  async getCompanyScores(companyId: string) {
    return this.prisma.score.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      include: {
        actionPlan: true,
      },
    });
  }

  async getScore(id: string) {
    const score = await this.prisma.score.findUnique({
      where: { id },
      include: {
        company: true,
        actionPlan: true,
      },
    });
    
    if (score) {
      return {
        ...score,
        responses: JSON.parse(score.responses),
        actionPlan: score.actionPlan ? {
          ...score.actionPlan,
          recommendations: JSON.parse(score.actionPlan.recommendations)
        } : null
      };
    }
    return null;
  }
}
