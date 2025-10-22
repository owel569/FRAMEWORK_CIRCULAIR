import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async generateActionPlan(scoreId: string) {
    const score = await this.prisma.score.findUnique({
      where: { id: scoreId },
      include: { company: true },
    });

    if (!score) {
      throw new Error('Score non trouvé');
    }

    const recommendations = this.generateRecommendations(score);
    const priority = this.determinePriority(score.globalScore);
    const timeline = this.generateTimeline(score.globalScore);

    const actionPlan = await this.prisma.actionPlan.create({
      data: {
        scoreId,
        recommendations: JSON.stringify(recommendations),
        priority,
        timeline,
      },
    });

    return actionPlan;
  }

  private generateRecommendations(score: any) {
    const recommendations = [];

    if (score.governanceScore < 60) {
      recommendations.push({
        category: 'Gouvernance',
        title: 'Mettre en place une politique formelle d\'économie circulaire',
        description: 'Définir une stratégie claire avec objectifs mesurables conformes à ISO 59004',
        priority: 'Haute',
        iso: 'ISO 59004:2024',
      });
    }

    if (score.economicScore < 60) {
      recommendations.push({
        category: 'Économique',
        title: 'Optimiser les flux de matières et réduire les déchets',
        description: 'Identifier les opportunités de valorisation selon ISO 59020',
        priority: 'Haute',
        iso: 'ISO 59020:2024',
      });
    }

    if (score.socialScore < 60) {
      recommendations.push({
        category: 'Social',
        title: 'Former les équipes aux principes de l\'économie circulaire',
        description: 'Sensibiliser et impliquer le personnel dans la démarche',
        priority: 'Moyenne',
        iso: 'ISO 59004:2024',
      });
    }

    return recommendations;
  }

  private determinePriority(globalScore: number): string {
    if (globalScore < 40) return 'Critique';
    if (globalScore < 60) return 'Haute';
    if (globalScore < 80) return 'Moyenne';
    return 'Faible';
  }

  private generateTimeline(globalScore: number): string {
    if (globalScore < 40) return '6 mois';
    if (globalScore < 60) return '12 mois';
    if (globalScore < 80) return '18 mois';
    return '24 mois';
  }
}
