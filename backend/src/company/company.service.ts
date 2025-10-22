import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: data.name,
        sector: data.sector,
        email: data.email,
        phone: data.phone,
      },
    });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        scores: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      include: {
        scores: {
          orderBy: { createdAt: 'desc' },
          include: {
            actionPlan: true,
          },
        },
      },
    });
  }
}
