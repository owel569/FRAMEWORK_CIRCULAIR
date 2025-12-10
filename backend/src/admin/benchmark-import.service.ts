
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as XLSX from 'xlsx';

interface BenchmarkRow {
  secteur: string;
  tranche_employes: string;
  indicateur: string;
  categorie: string;
  valeur_moyenne: number;
  unite?: string;
  source?: string;
  annee?: number;
}

@Injectable()
export class BenchmarkImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importFromExcel(filePath: string): Promise<{ imported: number; errors: string[] }> {
    const errors: string[] = [];
    let imported = 0;

    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: BenchmarkRow[] = XLSX.utils.sheet_to_json(sheet);

      console.log(`📊 Import de ${rows.length} lignes de moyennes sectorielles...`);

      for (const row of rows) {
        try {
          // Validation des données
          if (!row.secteur || !row.tranche_employes || !row.indicateur || row.valeur_moyenne === undefined) {
            errors.push(`Ligne invalide: ${JSON.stringify(row)}`);
            continue;
          }

          await this.prisma.sectorBenchmark.upsert({
            where: {
              sector_employeeRange_indicator: {
                sector: row.secteur.trim(),
                employeeRange: row.tranche_employes.trim(),
                indicator: row.indicateur.trim(),
              },
            },
            update: {
              averageValue: Number(row.valeur_moyenne),
              indicatorCategory: row.categorie || 'général',
              unit: row.unite || null,
              source: row.source || 'Import manuel',
              year: row.annee || new Date().getFullYear(),
            },
            create: {
              sector: row.secteur.trim(),
              employeeRange: row.tranche_employes.trim(),
              indicator: row.indicateur.trim(),
              indicatorCategory: row.categorie || 'général',
              averageValue: Number(row.valeur_moyenne),
              unit: row.unite || null,
              source: row.source || 'Import manuel',
              year: row.annee || new Date().getFullYear(),
            },
          });

          imported++;
        } catch (error) {
          errors.push(`Erreur ligne ${row.secteur}-${row.indicateur}: ${error.message}`);
        }
      }

      console.log(`✅ Import terminé: ${imported} moyennes importées`);
      if (errors.length > 0) {
        console.warn(`⚠️ ${errors.length} erreurs rencontrées`);
      }

      return { imported, errors };
    } catch (error) {
      console.error('❌ Erreur import Excel:', error);
      throw new Error(`Erreur lors de l'import: ${error.message}`);
    }
  }

  async getBenchmark(sector: string, employeeRange: string, indicator: string): Promise<number | null> {
    const benchmark = await this.prisma.sectorBenchmark.findUnique({
      where: {
        sector_employeeRange_indicator: {
          sector,
          employeeRange,
          indicator,
        },
      },
    });

    return benchmark ? benchmark.averageValue : null;
  }

  async getAllBenchmarks(filters?: { sector?: string; category?: string }): Promise<any[]> {
    const where: any = {};
    if (filters?.sector) where.sector = filters.sector;
    if (filters?.category) where.indicatorCategory = filters.category;

    return this.prisma.sectorBenchmark.findMany({
      where,
      orderBy: [{ sector: 'asc' }, { indicator: 'asc' }],
    });
  }

  async deleteBenchmark(id: string): Promise<void> {
    await this.prisma.sectorBenchmark.delete({ where: { id } });
  }

  async deleteAllBenchmarks(): Promise<number> {
    const result = await this.prisma.sectorBenchmark.deleteMany({});
    return result.count;
  }
}
