
export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface CreateQuestionDto {
  questionId: string;
  sector: string;
  category: string;
  text: string;
  type: 'boolean' | 'percentage' | 'number' | 'text' | 'choice';
  weight: number;
  unit?: string;
  choices?: string[];
  isoReference?: string;
}

export interface UpdateQuestionDto {
  text?: string;
  type?: 'boolean' | 'percentage' | 'number' | 'text' | 'choice';
  weight?: number;
  unit?: string;
  choices?: string[];
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
    globalScore: number;
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
  globalScore: number;
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
  globalScore: number;
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
