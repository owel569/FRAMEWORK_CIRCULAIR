
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
    const sectorKey = sector as SectorCategory;
    const sectorName = SectorCategory[sectorKey];
    
    if (!sectorName) {
      return { error: 'Secteur non trouvé' };
    }

    const sectorData = SECTOR_QUESTIONNAIRES[sectorKey];
    
    if (!sectorData) {
      return { error: 'Secteur non trouvé' };
    }

    const questionsWithGuidance = sectorData.questions.map(q => ({
      ...q,
      guidance: getGuidanceForQuestion(q.text, q.category, q.unit)
    }));
    
    return {
      sector: sectorName,
      subSectors: sectorData.subSectors,
      questions: questionsWithGuidance,
    };
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
