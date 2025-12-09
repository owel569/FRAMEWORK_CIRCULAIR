
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DemoDataService } from './demo-data.service';
import { CompanyManagementService } from './company-management.service';
import { ActionPlanManagementService } from './action-plan-management.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    DemoDataService,
    CompanyManagementService,
    ActionPlanManagementService,
    PrismaService,
  ],
})
export class AdminModule {}
