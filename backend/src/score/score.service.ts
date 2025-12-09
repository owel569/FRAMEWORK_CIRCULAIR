import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Score, Company } from '@prisma/client';
import { GENERAL_QUESTIONS } from '../data/general-questions.data';

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
  overallScore: number;
  governanceScore: number;
  economicScore: number;
  socialScore: number;
  environmentalScore: number;
}

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateScore(companyId: string, responses: any): Promise<Score> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId }
    });

    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    // Convertir les réponses au format attendu
    const formattedResponses: DimensionResponses = {
      governance: this.formatResponses(responses.governance),
      economic: this.formatResponses(responses.economic),
      social: this.formatResponses(responses.social),
      environmental: this.formatResponses(responses.environmental),
    };

    const scores = this.calculateAllScores(formattedResponses, company);

    const maturityLevel = this.determineMaturityLevel(scores.overallScore);
    
    const score = await this.prisma.score.create({
      data: {
        company: { connect: { id: companyId } },
        overallScore: scores.overallScore,
        governanceScore: scores.governanceScore,
        economicScore: scores.economicScore,
        socialScore: scores.socialScore,
        environmentalScore: scores.environmentalScore,
        maturityLevel,
        responses: JSON.stringify(responses),
      },
    });

    return score;
  }

  private formatResponses(dimensionResponses: any): QuestionResponse[] {
    if (!dimensionResponses) return [];
    
    // Si c'est déjà un tableau, le retourner
    if (Array.isArray(dimensionResponses)) {
      return dimensionResponses;
    }
    
    // Si c'est un objet, le convertir en tableau
    return Object.entries(dimensionResponses).map(([id, value]) => ({
      id,
      value: Number(value) || 0
    }));
  }

  private calculateAllScores(
    responses: DimensionResponses,
    company: Company
  ): ScoreCalculationResult {
    console.log('📊 Calcul des scores avec réponses:', JSON.stringify(responses, null, 2));
    
    const generalQuestionIds = GENERAL_QUESTIONS.map(q => q.id);
    const governanceResponses = responses.governance ?? [];
    const generalScore = this.calculateDimensionScore(governanceResponses.filter(q => generalQuestionIds.includes(q.id)));
    const governanceScore = this.calculateDimensionScore(governanceResponses.filter(q => !generalQuestionIds.includes(q.id)));
    const economicScore = this.calculateEnhancedEconomicScore(responses.economic ?? [], company);
    const socialScore = this.calculateEnhancedSocialScore(responses.social ?? [], company);
    const environmentalScore = this.calculateEnhancedEnvironmentalScore(
      responses.environmental ?? [],
      company
    );
    
    console.log('✅ Scores calculés:', { governanceScore, economicScore, socialScore, environmentalScore });

    // Pondération ISO 59000 : Env (35%), Éco (30%), Social (20%), Gouvernance (15%)
    const overallScore = Number(
      (
        environmentalScore * 0.35 +
        economicScore * 0.30 +
        socialScore * 0.20 +
        (governanceScore * 0.10 + generalScore * 0.05) * 0.15 // Combinaison des scores de gouvernance et généraux
      ).toFixed(2)
    );

    return {
      overallScore,
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
    let uncertaintyPenalty = 0;

    // Moyennes sectorielles par défaut (Industrie manufacturière)
    const sectorDefaults = {
      valorisation: 50,
      achatsLocaux: 40,
      achatsResponsables: 35,
    };

    // Bonus pour valorisation des déchets (avec fallback sectoriel)
    const valorisation = company.pourcentageValorisation ?? sectorDefaults.valorisation;
    if (company.pourcentageValorisation === null || company.pourcentageValorisation === undefined) {
      uncertaintyPenalty += 2; // Pénalité pour donnée manquante
    }
    if (valorisation !== null && valorisation !== undefined) {
      const bonusValorisation = (valorisation / 100) * 12;
      baseScore = Math.min(100, baseScore + bonusValorisation - uncertaintyPenalty);
    }

    // Bonus pour achats locaux
    if (company.partAchatsLocaux !== null && company.partAchatsLocaux !== undefined) {
      const bonusAchatsLocaux = (company.partAchatsLocaux / 100) * 8;
      baseScore = Math.min(100, baseScore + bonusAchatsLocaux);
    }

    // Bonus pour achats responsables
    if (company.achatsResponsablesPct !== null && company.achatsResponsablesPct !== undefined) {
      const bonusAchatsResponsables = (company.achatsResponsablesPct / 100) * 10;
      baseScore = Math.min(100, baseScore + bonusAchatsResponsables);
    }

    // Bonus pour économie potentielle
    if (company.economiePotentielleMad !== null && company.economiePotentielleMad !== undefined && company.economiePotentielleMad > 0) {
      baseScore = Math.min(100, baseScore + 5);
    }

    // Bonus pour taux d'utilisation des équipements
    if (company.tauxUtilisationEqPct !== null && company.tauxUtilisationEqPct !== undefined) {
      if (company.tauxUtilisationEqPct >= 80) {
        baseScore = Math.min(100, baseScore + 8);
      } else if (company.tauxUtilisationEqPct >= 60) {
        baseScore = Math.min(100, baseScore + 5);
      }
    }

    // Bonus pour utilisation de matières recyclées
    if (company.matieresRecycleesMad !== null && company.matieresRecycleesMad !== undefined && company.matieresRecycleesMad > 0) {
      baseScore = Math.min(100, baseScore + 7);
    }

    return baseScore;
  }

  private calculateEnhancedSocialScore(
    answers: QuestionResponse[],
    company: Company
  ): number {
    let baseScore = this.calculateDimensionScore(answers);

    // Bonus pour emplois locaux (ancien champ)
    if (company.partEmploisLocaux !== null && company.partEmploisLocaux !== undefined) {
      const bonusEmploi = (company.partEmploisLocaux / 100) * 12;
      baseScore = Math.min(100, baseScore + bonusEmploi);
    }

    // Bonus pour emplois locaux (nouveau champ)
    if (company.partEmploisLocauxPct !== null && company.partEmploisLocauxPct !== undefined) {
      const bonusEmploiPct = (company.partEmploisLocauxPct / 100) * 12;
      baseScore = Math.min(100, baseScore + bonusEmploiPct);
    }

    // Bonus pour heures de formation (ancien champ)
    if (company.heuresFormation !== null && company.heuresFormation !== undefined) {
      const bonusFormation = (Math.min(20, company.heuresFormation) / 20) * 8;
      baseScore = Math.min(100, baseScore + bonusFormation);
    }

    // Bonus pour heures de formation par salarié (nouveau champ)
    if (company.heuresFormationSalarieAn !== null && company.heuresFormationSalarieAn !== undefined) {
      if (company.heuresFormationSalarieAn >= 40) {
        baseScore = Math.min(100, baseScore + 10);
      } else if (company.heuresFormationSalarieAn >= 30) {
        baseScore = Math.min(100, baseScore + 7);
      } else if (company.heuresFormationSalarieAn >= 20) {
        baseScore = Math.min(100, baseScore + 5);
      }
    }

    // Bonus pour recrutement
    if (company.recrutementAn !== null && company.recrutementAn !== undefined && company.recrutementAn > 0) {
      baseScore = Math.min(100, baseScore + 5);
    }

    // Bonus pour parité femmes
    if (company.partFemmesPct !== null && company.partFemmesPct !== undefined) {
      if (company.partFemmesPct >= 40 && company.partFemmesPct <= 60) {
        baseScore = Math.min(100, baseScore + 10);
      } else if (company.partFemmesPct >= 30) {
        baseScore = Math.min(100, baseScore + 5);
      }
    }

    return baseScore;
  }

  private calculateEnhancedEnvironmentalScore(
    answers: QuestionResponse[],
    company: Company
  ): number {
    let baseScore = this.calculateDimensionScore(answers);

    // Bonus based on emissions (using absolute values since employeeCount is not tracked)
    if (
      company.emissionsScope12 !== null &&
      company.emissionsScope12 !== undefined
    ) {
      // Lower emissions = better score
      if (company.emissionsScope12 < 100) {
        baseScore = Math.min(100, baseScore + 15);
      } else if (company.emissionsScope12 < 500) {
        baseScore = Math.min(100, baseScore + 10);
      } else if (company.emissionsScope12 < 1000) {
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

  private determineMaturityLevel(overallScore: number): string {
    if (overallScore >= 80) return 'Avancé';
    if (overallScore >= 60) return 'Intermédiaire';
    if (overallScore >= 40) return 'Émergent';
    return 'Initial';
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
      responses: typeof score.responses === 'string' ? JSON.parse(score.responses) : score.responses,
      actionPlan: score.actionPlan
        ? {
            ...score.actionPlan,
            recommendations: JSON.parse(score.actionPlan.recommendations),
          }
        : null,
    };
  }
}