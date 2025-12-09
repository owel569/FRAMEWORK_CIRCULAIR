import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CompanyManagementService } from './company-management.service';
import { ActionPlanManagementService } from './action-plan-management.service';
import { TeamManagementService } from './team-management.service';
import { DemoDataService } from './demo-data.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    CompanyManagementService,
    ActionPlanManagementService,
    TeamManagementService,
    DemoDataService,
    PrismaService,
  ],
  exports: [AdminService],
})
export class AdminModule {}