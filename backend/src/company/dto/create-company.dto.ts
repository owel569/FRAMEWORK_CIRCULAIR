
import { IsString, IsEmail, IsOptional, IsNumber, IsPositive, Min, Max, Matches, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  name: string;

  @IsString()
  @Length(3, 100, { message: 'Le secteur doit être spécifié' })
  sector: string;

  @IsEmail({}, { message: 'Format d\'email invalide' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'L\'email doit avoir un format valide (ex: nom@entreprise.com)'
  })
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^(\+212|0)[5-7][0-9]{8}$/, {
    message: 'Le numéro de téléphone doit être au format marocain valide (+212XXXXXXXXX ou 0XXXXXXXXX)'
  })
  phone?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  employeeCount?: number;

  // Logistique et Centres
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  tonnageLogistique?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  emissionsLogistiques?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  tonnageAlternatif?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  coutActuel?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  coutTraitement?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  centreActuel?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  centreAlternatif?: number;

  // Consommations énergétiques
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  electriciteKWh?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  gazKWh?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  eauM3?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  carburantsLitres?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  consommationEau?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  consommationCarburant?: number;

  // Émissions
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  emissionsScope12?: number;

  // Indicateurs sociaux
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  heuresFormation?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  partAchatsLocaux?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  partEmploisLocaux?: number;

  // Gestion des déchets
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  dechetsTotaux?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  dechetsValorises?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  pourcentageValorisation?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  dechetsDangereux?: number;

  // Indicateurs économiques avancés
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  depensesMaintenanceMad?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  dureeVieEquipementAns?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  tauxRebutPct?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  beneficeEconomique?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  coutAlternatifMad?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  economiePotentielleMad?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  tauxUtilisationEqPct?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  matieresRecycleesMad?: number;

  // Indicateurs sociaux avancés
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  achatsResponsablesPct?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  partEmploisLocauxPct?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  recrutementAn?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  heuresFormationSalarieAn?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  partFemmesPct?: number;
}
