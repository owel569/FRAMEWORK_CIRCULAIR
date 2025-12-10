
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BenchmarkImportService } from '../admin/benchmark-import.service';
import type { Company } from '@prisma/client';

interface QuestionWithCoefficient {
  id: string;
  value: number;
  coefficient: number; // 1, 2, ou 3
  isInverted: boolean; // true si on doit inverser le signe
}

interface ComparativeScoreResult {
  indicator: string;
  companyValue: number;
  sectorAverage: number;
  gap: number; // Écart en %
  weightedScore: number; // Score pondéré avec coefficient
  coefficient: number;
}

@Injectable()
export class ComparativeScoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly benchmarkService: BenchmarkImportService,
  ) {}

  /**
   * Calcule le score par comparaison avec moyennes sectorielles
   */
  async calculateComparativeScore(
    company: Company,
    responses: QuestionWithCoefficient[],
    category: string,
  ): Promise<{ score: number; details: ComparativeScoreResult[] }> {
    const details: ComparativeScoreResult[] = [];
    let totalWeightedScore = 0;
    let totalQuestions = 0;

    for (const response of responses) {
      const indicator = response.id;
      const companyValue = response.value;
      const coefficient = response.coefficient || 1;
      const isInverted = response.isInverted || false;

      // Récupérer la moyenne sectorielle
      const employeeRange = this.getEmployeeRange(company.employeeCount);
      const sectorAverage = await this.benchmarkService.getBenchmark(
        company.sector,
        employeeRange,
        indicator,
      );

      if (sectorAverage === null) {
        console.warn(`⚠️ Aucune moyenne sectorielle pour ${indicator} (${company.sector})`);
        continue;
      }

      // Calcul de l'écart en pourcentage
      const gap = ((companyValue - sectorAverage) / sectorAverage) * 100;

      // Application du coefficient et du signe
      let weightedScore = gap * coefficient;
      
      // Si isInverted = true, on inverse le signe
      // (pour les cas où une valeur basse = mauvaise performance)
      if (isInverted) {
        weightedScore = -weightedScore;
      }

      details.push({
        indicator,
        companyValue,
        sectorAverage,
        gap,
        weightedScore,
        coefficient,
      });

      totalWeightedScore += weightedScore;
      totalQuestions++;
    }

    // Score global du domaine = moyenne des scores pondérés
    const score = totalQuestions > 0 ? totalWeightedScore / totalQuestions : 0;

    return { score, details };
  }

  /**
   * Détermine la tranche d'effectif
   */
  private getEmployeeRange(employeeCount?: number): string {
    if (!employeeCount) return '1-10';
    if (employeeCount <= 10) return '1-10';
    if (employeeCount <= 50) return '11-50';
    if (employeeCount <= 200) return '51-200';
    if (employeeCount <= 500) return '201-500';
    return '500+';
  }

  /**
   * Calcule le score global avec pondération ISO 59000
   */
  calculateOverallScore(scores: {
    environmental: number;
    economic: number;
    social: number;
    governance: number;
  }): number {
    return (
      scores.environmental * 0.35 +
      scores.economic * 0.30 +
      scores.social * 0.20 +
      scores.governance * 0.15
    );
  }
}
