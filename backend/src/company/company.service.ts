
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompanyDto): Promise<Company> {
    const companyData: Prisma.CompanyCreateInput = {
      name: data.name,
      sector: data.sector,
      email: data.email,
      phone: data.phone,
      employeeCount: data.employeeCount,
      
      // Logistique et Centres
      tonnageLogistique: data.tonnageLogistique,
      emissionsLogistiques: data.emissionsLogistiques,
      tonnageAlternatif: data.tonnageAlternatif,
      coutActuel: data.coutActuel,
      coutTraitement: data.coutTraitement,
      centreActuel: data.centreActuel,
      centreAlternatif: data.centreAlternatif,
      
      // Consommations énergétiques
      electriciteKWh: data.electriciteKWh,
      gazKWh: data.gazKWh,
      eauM3: data.eauM3,
      carburantsLitres: data.carburantsLitres,
      consommationEau: data.consommationEau,
      consommationCarburant: data.consommationCarburant,
      
      // Émissions
      emissionsScope12: data.emissionsScope12,
      
      // Indicateurs sociaux
      heuresFormation: data.heuresFormation,
      partAchatsLocaux: data.partAchatsLocaux,
      partEmploisLocaux: data.partEmploisLocaux,
      
      // Gestion des déchets
      dechetsTotaux: data.dechetsTotaux,
      dechetsValorises: data.dechetsValorises,
      pourcentageValorisation: data.pourcentageValorisation,
      dechetsDangereux: data.dechetsDangereux,
      
      // Indicateurs économiques avancés
      depensesMaintenanceMad: data.depensesMaintenanceMad,
      dureeVieEquipementAns: data.dureeVieEquipementAns,
      tauxRebutPct: data.tauxRebutPct,
      beneficeEconomique: data.beneficeEconomique,
      coutAlternatifMad: data.coutAlternatifMad,
      economiePotentielleMad: data.economiePotentielleMad,
      tauxUtilisationEqPct: data.tauxUtilisationEqPct,
      matieresRecycleesMad: data.matieresRecycleesMad,
      
      // Indicateurs sociaux avancés
      achatsResponsablesPct: data.achatsResponsablesPct,
      partEmploisLocauxPct: data.partEmploisLocauxPct,
      recrutementAn: data.recrutementAn,
      heuresFormationSalarieAn: data.heuresFormationSalarieAn,
      partFemmesPct: data.partFemmesPct,
    };

    return this.prisma.company.create({
      data: companyData,
    });
  }

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany({
      include: {
        scores: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async findOne(id: string): Promise<Company | null> {
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
