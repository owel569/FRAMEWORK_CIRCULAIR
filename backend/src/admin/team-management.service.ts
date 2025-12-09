
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface CreateTeamMemberDto {
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  specialties: string[];
  order?: number;
}

interface UpdateTeamMemberDto {
  name?: string;
  role?: string;
  bio?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  specialties?: string[];
  order?: number;
  isActive?: boolean;
}

@Injectable()
export class TeamManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMembers(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };
    return this.prisma.teamMember.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async getMemberById(id: string) {
    return this.prisma.teamMember.findUnique({
      where: { id },
    });
  }

  async createMember(data: CreateTeamMemberDto, adminId: string) {
    const maxOrder = await this.prisma.teamMember.aggregate({
      _max: { order: true },
    });

    const member = await this.prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        image: data.image,
        email: data.email,
        linkedin: data.linkedin,
        specialties: JSON.stringify(data.specialties),
        order: data.order ?? (maxOrder._max.order ?? 0) + 1,
      },
    });

    await this.prisma.activityLog.create({
      data: {
        adminUserId: adminId,
        action: 'CREATE_TEAM_MEMBER',
        entityType: 'TeamMember',
        entityId: member.id,
        details: `Membre ajouté: ${member.name}`,
      },
    });

    return member;
  }

  async updateMember(id: string, data: UpdateTeamMemberDto, adminId: string) {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.role) updateData.role = data.role;
    if (data.bio) updateData.bio = data.bio;
    if (data.image) updateData.image = data.image;
    if (data.email) updateData.email = data.email;
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin;
    if (data.specialties) updateData.specialties = JSON.stringify(data.specialties);
    if (data.order !== undefined) updateData.order = data.order;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const member = await this.prisma.teamMember.update({
      where: { id },
      data: updateData,
    });

    await this.prisma.activityLog.create({
      data: {
        adminUserId: adminId,
        action: 'UPDATE_TEAM_MEMBER',
        entityType: 'TeamMember',
        entityId: member.id,
        details: `Membre modifié: ${member.name}`,
      },
    });

    return member;
  }

  async deleteMember(id: string, adminId: string) {
    const member = await this.prisma.teamMember.findUnique({
      where: { id },
    });

    await this.prisma.teamMember.delete({
      where: { id },
    });

    await this.prisma.activityLog.create({
      data: {
        adminUserId: adminId,
        action: 'DELETE_TEAM_MEMBER',
        entityType: 'TeamMember',
        entityId: id,
        details: `Membre supprimé: ${member?.name}`,
      },
    });

    return { success: true };
  }

  async toggleStatus(id: string, adminId: string) {
    const member = await this.prisma.teamMember.findUnique({
      where: { id },
    });

    const updated = await this.prisma.teamMember.update({
      where: { id },
      data: { isActive: !member.isActive },
    });

    await this.prisma.activityLog.create({
      data: {
        adminUserId: adminId,
        action: 'TOGGLE_TEAM_MEMBER_STATUS',
        entityType: 'TeamMember',
        entityId: id,
        details: `Statut changé: ${member.name} → ${updated.isActive ? 'Actif' : 'Inactif'}`,
      },
    });

    return updated;
  }

  async reorderMembers(orderedIds: string[], adminId: string) {
    const updates = orderedIds.map((id, index) =>
      this.prisma.teamMember.update({
        where: { id },
        data: { order: index },
      })
    );

    await Promise.all(updates);

    await this.prisma.activityLog.create({
      data: {
        adminUserId: adminId,
        action: 'REORDER_TEAM_MEMBERS',
        entityType: 'TeamMember',
        details: `Ordre des membres modifié`,
      },
    });

    return { success: true };
  }
}
