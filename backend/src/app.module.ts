import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CompanyModule } from './company/company.module';
import { ScoreModule } from './score/score.module';
import { PlanModule } from './plan/plan.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CompanyModule,
    ScoreModule,
    PlanModule,
    ChatbotModule,
    QuestionnaireModule,
    AdminModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}