
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ActionPlanStatus } from '@prisma/client';

@Injectable()
export class ActionPlanManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyActionPlans(companyId: string) {
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

  async getActionPlanById(id: string) {
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

  async updateActionPlan(
    id: string,
    data: {
      actions?: string;
      status?: ActionPlanStatus;
      adminNotes?: string;
    },
    adminUserId: string,
  ) {
    const plan = await this.prisma.companyActionPlan.update({
      where: { id },
      data: {
        ...data,
        validatedAt: data.status === 'APPROVED' ? new Date() : undefined,
        validatedBy: data.status === 'APPROVED' ? adminUserId : undefined,
      },
    });

    // Log l'activité
    await this.prisma.activityLog.create({
      data: {
        adminUserId,
        companyId: plan.companyId,
        action: 'UPDATE_ACTION_PLAN',
        entityType: 'CompanyActionPlan',
        entityId: id,
        details: `Statut: ${data.status || 'modifié'}`,
      },
    });

    return plan;
  }

  async getPendingActionPlans() {
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

  async getActionPlanTemplates() {
    return this.prisma.actionPlanTemplate.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { priority: 'desc' }],
    });
  }

  async createActionPlanTemplate(data: {
    category: string;
    maturityLevel: string;
    title: string;
    description: string;
    priority: string;
  }) {
    return this.prisma.actionPlanTemplate.create({ data });
  }

  async updateActionPlanTemplate(id: string, data: any) {
    return this.prisma.actionPlanTemplate.update({
      where: { id },
      data,
    });
  }

  async deleteActionPlanTemplate(id: string) {
    return this.prisma.actionPlanTemplate.delete({
      where: { id },
    });
  }
}
