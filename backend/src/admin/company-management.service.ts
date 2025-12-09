
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface CompanyFilters {
  search?: string;
  sector?: string;
  maturityLevel?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

@Injectable()
export class CompanyManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCompanies(filters: CompanyFilters = {}) {
    const { search, sector, maturityLevel, isActive, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { contact: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (sector) {
      where.sector = sector;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    const [companies, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        include: {
          scores: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              id: true,
              overallScore: true,
              maturityLevel: true,
              governanceScore: true,
              economicScore: true,
              socialScore: true,
              environmentalScore: true,
              createdAt: true,
            },
          },
          assignments: {
            include: {
              adminUser: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              scores: true,
              actionPlans: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.company.count({ where }),
    ]);

    // Filtrer par niveau de maturité si spécifié
    let filteredCompanies = companies;
    if (maturityLevel) {
      filteredCompanies = companies.filter(
        (c) => c.scores[0]?.maturityLevel === maturityLevel
      );
    }

    return {
      companies: filteredCompanies.map((company) => ({
        ...company,
        latestScore: company.scores[0] || null,
        assignedExperts: company.assignments.map((a) => a.adminUser),
        scores: undefined,
        assignments: undefined,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        scores: {
          orderBy: { createdAt: 'desc' },
          include: {
            actionPlans: true,
          },
        },
        assignments: {
          include: {
            adminUser: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        activityLogs: {
          orderBy: { createdAt: 'desc' },
          take: 20,
          include: {
            adminUser: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Entreprise non trouvée');
    }

    return company;
  }

  async updateCompany(id: string, data: any, adminUserId: string) {
    const company = await this.prisma.company.update({
      where: { id },
      data: {
        name: data.name,
        sector: data.sector,
        size: data.size,
        location: data.location,
        contact: data.contact,
        email: data.email,
        isActive: data.isActive,
      },
    });

    // Log l'activité
    await this.logActivity({
      adminUserId,
      companyId: id,
      action: 'UPDATE_COMPANY',
      entityType: 'Company',
      entityId: id,
      details: `Mise à jour: ${Object.keys(data).join(', ')}`,
    });

    return company;
  }

  async toggleCompanyStatus(id: string, adminUserId: string) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Entreprise non trouvée');
    }

    const updated = await this.prisma.company.update({
      where: { id },
      data: { isActive: !company.isActive },
    });

    await this.logActivity({
      adminUserId,
      companyId: id,
      action: company.isActive ? 'DEACTIVATE_COMPANY' : 'ACTIVATE_COMPANY',
      entityType: 'Company',
      entityId: id,
      details: `Statut changé: ${company.isActive ? 'Actif → Inactif' : 'Inactif → Actif'}`,
    });

    return updated;
  }

  async assignExpert(companyId: string, expertId: string, adminUserId: string) {
    const assignment = await this.prisma.companyAssignment.create({
      data: {
        companyId,
        adminUserId: expertId,
      },
      include: {
        adminUser: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    await this.logActivity({
      adminUserId,
      companyId,
      action: 'ASSIGN_EXPERT',
      entityType: 'CompanyAssignment',
      entityId: assignment.id,
      details: `Expert assigné: ${assignment.adminUser.firstName} ${assignment.adminUser.lastName}`,
    });

    return assignment;
  }

  async removeExpertAssignment(companyId: string, expertId: string, adminUserId: string) {
    await this.prisma.companyAssignment.delete({
      where: {
        companyId_adminUserId: {
          companyId,
          adminUserId: expertId,
        },
      },
    });

    await this.logActivity({
      adminUserId,
      companyId,
      action: 'REMOVE_EXPERT',
      entityType: 'CompanyAssignment',
      entityId: companyId,
      details: 'Expert désassigné',
    });
  }

  async getCompanyStats() {
    const [
      total,
      activeCompanies,
      companiesByMaturity,
      companiesBySector,
      avgScores,
      recentEvaluations,
    ] = await Promise.all([
      this.prisma.company.count(),
      this.prisma.company.count({ where: { isActive: true } }),
      this.prisma.$queryRaw`
        SELECT s."maturityLevel", COUNT(DISTINCT c.id)::int as count
        FROM "Company" c
        LEFT JOIN "Score" s ON s."companyId" = c.id
        WHERE s."createdAt" = (
          SELECT MAX("createdAt") FROM "Score" WHERE "companyId" = c.id
        )
        GROUP BY s."maturityLevel"
      `,
      this.prisma.$queryRaw`
        SELECT sector, COUNT(*)::int as count
        FROM "Company"
        GROUP BY sector
        ORDER BY count DESC
      `,
      this.prisma.score.aggregate({
        _avg: {
          overallScore: true,
          governanceScore: true,
          economicScore: true,
          socialScore: true,
          environmentalScore: true,
        },
      }),
      this.prisma.score.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return {
      total,
      active: activeCompanies,
      inactive: total - activeCompanies,
      byMaturityLevel: companiesByMaturity,
      bySector: companiesBySector,
      averageScores: avgScores._avg,
      recentEvaluations,
    };
  }

  private async logActivity(data: {
    adminUserId: string;
    companyId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    details?: string;
  }) {
    await this.prisma.activityLog.create({
      data,
    });
  }
}
