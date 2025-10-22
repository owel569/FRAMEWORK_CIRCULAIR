
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DemoDataService } from './demo-data.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, DemoDataService, PrismaService],
})
export class AdminModule {}
