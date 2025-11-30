
import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SectorCategory } from '../types/questionnaire.types';
import { SECTOR_QUESTIONNAIRES } from '../data/questionnaires.data';
import { GENERAL_QUESTIONS } from '../data/general-questions.data';
import { getGuidanceForQuestion } from '../data/data-guidance';

const SECTOR_CODE_MAP: Record<string, SectorCategory> = {
  'AGRICULTURE': SectorCategory.AGRICULTURE,
  'INDUSTRY': SectorCategory.INDUSTRY,
  'CONSTRUCTION': SectorCategory.CONSTRUCTION,
  'COMMERCE': SectorCategory.COMMERCE,
  'TRANSPORT': SectorCategory.TRANSPORT,
  'ENERGY': SectorCategory.ENERGY,
  'HEALTH': SectorCategory.HEALTH,
  'IT': SectorCategory.IT,
  'FINANCE': SectorCategory.FINANCE,
  'PUBLIC_ADMIN': SectorCategory.PUBLIC_ADMIN,
  'EDUCATION': SectorCategory.EDUCATION,
  'HOSPITALITY': SectorCategory.HOSPITALITY,
  'CULTURE': SectorCategory.CULTURE,
  'REAL_ESTATE': SectorCategory.REAL_ESTATE,
  'SCIENCES': SectorCategory.SCIENCES,
  'CRAFTS': SectorCategory.CRAFTS,
  'B2B_SERVICES': SectorCategory.B2B_SERVICES,
  'B2C_SERVICES': SectorCategory.B2C_SERVICES,
  'NGO': SectorCategory.NGO,
  'EMERGING': SectorCategory.EMERGING,
};

const SECTOR_KEY_MAP: Record<SectorCategory, string> = {
  [SectorCategory.AGRICULTURE]: 'AGRICULTURE',
  [SectorCategory.INDUSTRY]: 'INDUSTRY',
  [SectorCategory.CONSTRUCTION]: 'CONSTRUCTION',
  [SectorCategory.COMMERCE]: 'COMMERCE',
  [SectorCategory.TRANSPORT]: 'TRANSPORT',
  [SectorCategory.ENERGY]: 'ENERGY',
  [SectorCategory.HEALTH]: 'HEALTH',
  [SectorCategory.IT]: 'IT',
  [SectorCategory.FINANCE]: 'FINANCE',
  [SectorCategory.PUBLIC_ADMIN]: 'PUBLIC_ADMIN',
  [SectorCategory.EDUCATION]: 'EDUCATION',
  [SectorCategory.HOSPITALITY]: 'HOSPITALITY',
  [SectorCategory.CULTURE]: 'CULTURE',
  [SectorCategory.REAL_ESTATE]: 'REAL_ESTATE',
  [SectorCategory.SCIENCES]: 'SCIENCES',
  [SectorCategory.CRAFTS]: 'CRAFTS',
  [SectorCategory.B2B_SERVICES]: 'B2B_SERVICES',
  [SectorCategory.B2C_SERVICES]: 'B2C_SERVICES',
  [SectorCategory.NGO]: 'NGO',
  [SectorCategory.EMERGING]: 'EMERGING',
};

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('general')
  getGeneralQuestions() {
    const questionsWithGuidance = GENERAL_QUESTIONS.map(q => ({
      ...q,
      guidance: getGuidanceForQuestion(q.text, q.category, q.unit)
    }));
    
    return {
      questions: questionsWithGuidance,
    };
  }

  @Get(':sector')
  async getQuestionnaireBySector(@Param('sector') sector: string) {
    try {
      const sectorCode = sector.toUpperCase();
      
      const sectorEnum = SECTOR_CODE_MAP[sectorCode];
      
      if (!sectorEnum) {
        console.error(`Secteur non trouvé: ${sector}`);
        return { 
          error: 'Secteur non trouvé',
          availableSectors: Object.keys(SECTOR_CODE_MAP)
        };
      }

      const sectorKey = SECTOR_KEY_MAP[sectorEnum] as keyof typeof SECTOR_QUESTIONNAIRES;
      const sectorData = Object.entries(SECTOR_QUESTIONNAIRES).find(
        ([key]) => key === sectorEnum
      )?.[1];
      
      if (!sectorData) {
        console.error(`Données secteur non trouvées pour: ${sectorEnum}`);
        return { 
          error: 'Données du secteur non trouvées',
          availableSectors: Object.keys(SECTOR_CODE_MAP)
        };
      }

      const questionsWithGuidance = sectorData.questions.map(q => ({
        ...q,
        guidance: getGuidanceForQuestion(q.text, q.category, q.unit)
      }));
      
      console.log(`✅ Questions chargées pour ${sectorCode}: ${questionsWithGuidance.length} questions`);
      
      return {
        sector: sectorEnum,
        subSectors: sectorData.subSectors,
        questions: questionsWithGuidance,
      };
    } catch (error) {
      console.error('Erreur lors du chargement des questions:', error);
      return { 
        error: 'Erreur lors du chargement des questions',
        message: error.message 
      };
    }
  }

  @Get()
  getAllSectors() {
    return Object.entries(SECTOR_QUESTIONNAIRES).map(([key, value]) => ({
      key: SECTOR_KEY_MAP[key as SectorCategory],
      name: key,
      subSectors: value.subSectors
    }));
  }
}
