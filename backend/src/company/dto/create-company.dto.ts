
import { IsString, IsEmail, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  sector: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  // Taille entreprise
  @IsOptional()
  @IsNumber()
  @Min(1)
  employeeCount?: number;

  // Métriques logistiques
  @IsOptional()
  @IsNumber()
  @Min(0)
  tonnageLogistique?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  emissionsLogistiques?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tonnageAlternatif?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  coutActuel?: number;

  // Métriques opérationnelles
  @IsOptional()
  @IsNumber()
  @Min(0)
  coutTraitement?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  centreActuel?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  centreAlternatif?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  electriciteKWh?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  gazKWh?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  eauM3?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  carburantsLitres?: number;

  // Métriques environnementales
  @IsOptional()
  @IsNumber()
  @Min(0)
  consommationEau?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  consommationCarburant?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  emissionsScope12?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  heuresFormation?: number;

  // Métriques économie circulaire
  @IsOptional()
  @IsNumber()
  @Min(0)
  partAchatsLocaux?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  partEmploisLocaux?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dechetsTotaux?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dechetsValorises?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pourcentageValorisation?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dechetsDangereux?: number;
}
