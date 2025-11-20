
import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SectorCategory } from '../types/questionnaire.types';
import { SECTOR_QUESTIONNAIRES } from '../data/questionnaires.data';
import { GENERAL_QUESTIONS } from '../data/general-questions.data';
import { getGuidanceForQuestion } from '../data/data-guidance';

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
      const sectorKey = sector.toUpperCase() as SectorCategory;
      
      // Vérifier si le secteur existe
      const sectorData = SECTOR_QUESTIONNAIRES[sectorKey];
      
      if (!sectorData) {
        console.error(`Secteur non trouvé: ${sector}`);
        return { 
          error: 'Secteur non trouvé',
          availableSectors: Object.keys(SECTOR_QUESTIONNAIRES)
        };
      }

      const questionsWithGuidance = sectorData.questions.map(q => ({
        ...q,
        guidance: getGuidanceForQuestion(q.text, q.category, q.unit)
      }));
      
      console.log(`✅ Questions chargées pour ${sectorKey}: ${questionsWithGuidance.length} questions`);
      
      return {
        sector: SectorCategory[sectorKey],
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
    return Object.keys(SECTOR_QUESTIONNAIRES).map(key => ({
      key,
      name: SECTOR_QUESTIONNAIRES[key as SectorCategory].sector,
      subSectors: SECTOR_QUESTIONNAIRES[key as SectorCategory].subSectors
    }));
  }
}
