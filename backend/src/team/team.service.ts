
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveMembers() {
    const members = await this.prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return members.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      email: member.email,
      linkedin: member.linkedin,
      specialties: JSON.parse(member.specialties || '[]'),
    }));
  }
}
