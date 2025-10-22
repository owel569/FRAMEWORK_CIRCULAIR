import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService],
  exports: [ScoreService],
})
export class ScoreModule {}
