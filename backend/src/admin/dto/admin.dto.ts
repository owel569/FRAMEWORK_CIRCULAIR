
import { IsEmail, IsString, MinLength, Matches, Length, IsIn, IsArray, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class AdminLoginDto {
  @IsEmail({}, { message: 'Format d\'email invalide' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'L\'email doit avoir un format valide'
  })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;
}

export class CreateQuestionDto {
  @IsString()
  @Length(5, 50, { message: 'L\'ID de question doit contenir entre 5 et 50 caractères' })
  questionId: string;

  @IsString()
  @Length(3, 100)
  sector: string;

  @IsString()
  @IsIn(['environnemental', 'économique', 'social', 'gouvernance'], {
    message: 'Catégorie invalide'
  })
  category: string;

  @IsString()
  @Length(10, 500, { message: 'Le texte de la question doit contenir entre 10 et 500 caractères' })
  text: string;

  @IsString()
  @IsIn(['boolean', 'percentage', 'number', 'text', 'choice'], {
    message: 'Type de question invalide'
  })
  type: 'boolean' | 'percentage' | 'number' | 'text' | 'choice';

  @IsNumber()
  @Min(0.1, { message: 'Le poids doit être supérieur à 0' })
  @Max(10, { message: 'Le poids ne peut pas dépasser 10' })
  weight: number;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  unit?: string;

  @IsArray()
  @IsOptional()
  choices?: string[];

  @IsString()
  @IsOptional()
  @Length(0, 100)
  isoReference?: string;
}

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  @Length(10, 500)
  text?: string;

  @IsString()
  @IsOptional()
  @IsIn(['boolean', 'percentage', 'number', 'text', 'choice'])
  type?: 'boolean' | 'percentage' | 'number' | 'text' | 'choice';

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  @Max(10)
  weight?: number;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  unit?: string;

  @IsArray()
  @IsOptional()
  choices?: string[];

  @IsString()
  @IsOptional()
  @Length(0, 100)
  isoReference?: string;
}

export interface AdminStatsDto {
  totalCompanies: number;
  totalScores: number;
  totalQuestions: number;
  recentCompanies: CompanyWithScore[];
  scoresByMonth: MonthlyScoreData[];
  sectorDistribution: SectorData[];
  averageScores: AverageScoresData;
  performanceTrends: PerformanceTrend[];
  topPerformers: TopPerformer[];
}

export interface CompanyWithScore {
  id: string;
  name: string;
  sector: string;
  email: string;
  createdAt: Date;
  scores: Array<{
    overallScore: number;
    createdAt: Date;
  }>;
}

export interface MonthlyScoreData {
  month: string;
  count: number;
  averageScore: number;
}

export interface SectorData {
  sector: string;
  count: number;
  averageScore: number;
}

export interface AverageScoresData {
  global: number;
  governance: number;
  economic: number;
  social: number;
  environmental: number;
}

export interface PerformanceTrend {
  month: string;
  governance: number;
  economic: number;
  social: number;
  environmental: number;
}

export interface TopPerformer {
  companyName: string;
  sector: string;
  overallScore: number;
  rank: number;
}

export interface CompanyDetailDto {
  id: string;
  name: string;
  sector: string;
  email: string;
  employeeCount?: number;
  createdAt: Date;
  scores: ScoreHistoryDto[];
  totalEvaluations: number;
  scoreProgression: number;
}

export interface ScoreHistoryDto {
  id: string;
  overallScore: number;
  governanceScore: number;
  economicScore: number;
  socialScore: number;
  environmentalScore: number;
  createdAt: Date;
}

export interface ActivityLogDto {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: Date;
  userId?: string;
}
