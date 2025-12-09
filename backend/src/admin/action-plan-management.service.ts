import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { 
  CreateActionPlanDto, 
  UpdateActionPlanDto, 
  CreateActionPlanTemplateDto,
  ActionPlanTemplateDto 
} from './dto/admin.dto';
import { ActionPlan, ActionPlanTemplate, Prisma, CompanyActionPlan } from '@prisma/client';

@Injectable()
export class ActionPlanManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyActionPlans(companyId: string): Promise<Array<CompanyActionPlan & { score: { overallScore: number | null; maturityLevel: string | null; createdAt: Date; } }>> {
    return this.prisma.companyActionPlan.findMany({
      where: { companyId },
      include: {
        score: {
          select: {
            overallScore: true,
            maturityLevel: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getActionPlanById(id: string): Promise<CompanyActionPlan & { company: any; score: any }> {
    const plan = await this.prisma.companyActionPlan.findUnique({
      where: { id },
      include: {
        company: true,
        score: true,
      },
    });

    if (!plan) {
      throw new NotFoundException('Plan d\'action non trouvé');
    }

    return plan;
  }

  async updateActionPlan(id: string, data: UpdateActionPlanDto, adminUserId: string): Promise<CompanyActionPlan> {
    const existingPlan = await this.prisma.companyActionPlan.findUnique({ where: { id } });

    if (!existingPlan) {
      throw new NotFoundException(`Plan d'action avec l'ID ${id} non trouvé`);
    }

    const updateData: Prisma.CompanyActionPlanUpdateInput = {};

    if (data.actions) {
      // Assuming actions is an array of strings or objects that can be JSON stringified
      try {
        updateData.actions = JSON.stringify(data.actions);
      } catch (e) {
        throw new BadRequestException('Format des actions invalide');
      }
    }

    if (data.status) {
      updateData.status = data.status;
    }

    if (data.adminNotes) { // Changed from 'notes' to 'adminNotes' to match potential DTO
      updateData.adminNotes = data.adminNotes;
    }

    if (data.status === 'APPROVED') {
      updateData.validatedBy = adminUserId;
      updateData.validatedAt = new Date();
    } else {
      // If status is not APPROVED, ensure validatedBy and validatedAt are cleared or not set
      // This depends on your business logic, if a plan can be un-approved.
      // For now, we only set them on APPROVAL.
    }

    const plan = await this.prisma.companyActionPlan.update({
      where: { id },
      data: updateData,
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        score: true, // Include score to potentially use its details if needed for logging
      },
    });

    // Log the activity
    await this.prisma.activityLog.create({
      data: {
        adminUserId: adminUserId,
        companyId: plan.companyId,
        action: 'UPDATE_ACTION_PLAN',
        entityType: 'CompanyActionPlan',
        entityId: id,
        details: `Plan d'action ${data.status ? data.status.toLowerCase() : 'modifié'} pour ${plan.company.name}`,
      },
    });

    return plan;
  }

  async getPendingActionPlans(): Promise<Array<CompanyActionPlan & { company: { id: string; name: string; sector: string | null; }; score: { overallScore: number | null; maturityLevel: string | null; }; }>> {
    return this.prisma.companyActionPlan.findMany({
      where: {
        status: { in: ['PENDING', 'IN_REVIEW'] },
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            sector: true,
          },
        },
        score: {
          select: {
            overallScore: true,
            maturityLevel: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getActionPlanTemplates(): Promise<ActionPlanTemplate[]> {
    return this.prisma.actionPlanTemplate.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { priority: 'desc' }],
    });
  }

  async createActionPlanTemplate(data: CreateActionPlanTemplateDto): Promise<ActionPlanTemplate> {
    return this.prisma.actionPlanTemplate.create({ data });
  }

  async updateActionPlanTemplate(id: string, data: Partial<ActionPlanTemplateDto>): Promise<ActionPlanTemplate> {
    // Ensure that isActive is not unintentionally set to false if not provided
    const { isActive, ...updateData } = data;
    
    const templateData: Prisma.ActionPlanTemplateUpdateInput = { ...updateData };
    if (isActive !== undefined) {
      templateData.isActive = isActive;
    }

    return this.prisma.actionPlanTemplate.update({
      where: { id },
      data: templateData,
    });
  }

  async deleteActionPlanTemplate(id: string): Promise<ActionPlanTemplate> {
    // Consider adding logic to check if the template is currently in use before deleting
    // For now, direct deletion as per original structure
    return this.prisma.actionPlanTemplate.delete({
      where: { id },
    });
  }
}