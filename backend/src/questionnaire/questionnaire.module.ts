
import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestionnaireController],
  providers: [PrismaService],
})
export class QuestionnaireModule {}
