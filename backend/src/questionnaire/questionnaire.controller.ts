
import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SectorCategory } from '../types/questionnaire.types';
import { SECTOR_QUESTIONNAIRES } from '../data/questionnaires.data';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':sector')
  async getQuestionnaireBySector(@Param('sector') sector: string) {
    const sectorKey = sector as SectorCategory;
    const sectorName = SectorCategory[sectorKey];
    
    if (!sectorName) {
      return { error: 'Secteur non trouvé' };
    }

    const questions = await this.prisma.questionnaireQuestion.findMany({
      where: { sector: sectorName },
      orderBy: [{ category: 'asc' }],
    });

    const formattedQuestions = questions.map(q => ({
      id: q.questionId,
      category: q.category,
      text: q.text,
      type: q.type,
      weight: q.weight,
      unit: q.unit,
      choices: q.choices ? JSON.parse(q.choices) : undefined,
      isoReference: q.isoReference,
    }));
    
    return {
      sector: sectorName,
      subSectors: SECTOR_QUESTIONNAIRES[sectorKey]?.subSectors || [],
      questions: formattedQuestions,
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
