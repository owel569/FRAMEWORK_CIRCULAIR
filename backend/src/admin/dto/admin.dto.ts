
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
  recentCompanies: any[];
  scoresByMonth: { month: string; count: number }[];
  sectorDistribution: { sector: string; count: number }[];
  averageScores: {
    global: number;
    governance: number;
    economic: number;
    social: number;
    environmental: number;
  };
}
