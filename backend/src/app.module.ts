import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CompanyModule } from './company/company.module';
import { ScoreModule } from './score/score.module';
import { PlanModule } from './plan/plan.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CompanyModule,
    ScoreModule,
    PlanModule,
    ChatbotModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
