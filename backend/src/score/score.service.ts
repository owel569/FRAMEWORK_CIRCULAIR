import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async calculateScore(companyId: string, responses: any) {
    // Récupérer les données de l'entreprise
    const company = await this.prisma.company.findUnique({
      where: { id: companyId }
    });

    const governanceScore = this.calculateDimensionScore(responses.governance || []);
    const economicScore = this.calculateEnhancedEconomicScore(responses.economic || [], company);
    const socialScore = this.calculateEnhancedSocialScore(responses.social || [], company);
    const environmentalScore = this.calculateEnhancedEnvironmentalScore(responses.environmental || [], company);
    
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

  private calculateEnhancedEconomicScore(answers: any[], company: any): number {
    let baseScore = this.calculateDimensionScore(answers);
    
    // Bonus si données réelles fournies
    if (company) {
      // Bonus pour valorisation des déchets
      if (company.pourcentageValorisation) {
        const bonusValorisation = (company.pourcentageValorisation / 100) * 15;
        baseScore = Math.min(100, baseScore + bonusValorisation);
      }
      
      // Bonus pour achats locaux
      if (company.partAchatsLocaux) {
        const bonusLocal = (company.partAchatsLocaux / 100) * 10;
        baseScore = Math.min(100, baseScore + bonusLocal);
      }
    }
    
    return baseScore;
  }

  private calculateEnhancedSocialScore(answers: any[], company: any): number {
    let baseScore = this.calculateDimensionScore(answers);
    
    if (company) {
      // Bonus pour emplois locaux
      if (company.partEmploisLocaux) {
        const bonusEmploi = (company.partEmploisLocaux / 100) * 15;
        baseScore = Math.min(100, baseScore + bonusEmploi);
      }
      
      // Bonus pour formation (objectif: 20h/ETP/an)
      if (company.heuresFormation) {
        const bonusFormation = Math.min(20, company.heuresFormation) / 20 * 10;
        baseScore = Math.min(100, baseScore + bonusFormation);
      }
    }
    
    return baseScore;
  }

  private calculateEnhancedEnvironmentalScore(answers: any[], company: any): number {
    let baseScore = this.calculateDimensionScore(answers);
    
    if (company) {
      // Bonus si faibles émissions par employé
      if (company.emissionsScope12 && company.employeeCount) {
        const emissionsParEmploye = company.emissionsScope12 / company.employeeCount;
        // Moins de 5 tCO2e/employé = excellent (bonus 15 points)
        if (emissionsParEmploye < 5) {
          baseScore = Math.min(100, baseScore + 15);
        } else if (emissionsParEmploye < 10) {
          baseScore = Math.min(100, baseScore + 10);
        } else if (emissionsParEmploye < 15) {
          baseScore = Math.min(100, baseScore + 5);
        }
      }
      
      // Bonus gestion des déchets dangereux
      if (company.dechetsDangereux !== undefined && company.dechetsTotaux) {
        const ratioDebchetsDangereux = (company.dechetsDangereux / company.dechetsTotaux) * 100;
        // Moins de 5% de déchets dangereux = bonus
        if (ratioDebchetsDangereux < 5) {
          baseScore = Math.min(100, baseScore + 10);
        }
      }
    }
    
    return baseScore;
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
