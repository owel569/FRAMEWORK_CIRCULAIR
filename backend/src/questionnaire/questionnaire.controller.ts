
import { Controller, Get, Param } from '@nestjs/common';
import { SECTOR_QUESTIONNAIRES } from '../data/questionnaires.data';
import { SectorCategory } from '../types/questionnaire.types';

@Controller('questionnaires')
export class QuestionnaireController {
  @Get(':sector')
  getQuestionnaireBySector(@Param('sector') sector: string) {
    const sectorKey = sector as SectorCategory;
    const questionnaire = SECTOR_QUESTIONNAIRES[sectorKey];
    
    if (!questionnaire) {
      return { error: 'Secteur non trouvé' };
    }
    
    return questionnaire;
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
