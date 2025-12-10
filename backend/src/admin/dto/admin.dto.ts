// ============ AUTHENTIFICATION ============
export class AdminLoginDto {
  email: string;
  password: string;
}

// ============ GESTION DES ENTREPRISES ============
export class CreateCompanyDto {
  name: string;
  email: string;
  sector: string;
  subSector?: string;
  phone?: string;
  address?: string;
  size?: 'TPE' | 'PME' | 'ETI' | 'GE';
  employeeCount?: number;
}

export class UpdateCompanyDto {
  name?: string;
  email?: string;
  sector?: string;
  subSector?: string;
  phone?: string;
  address?: string;
  size?: 'TPE' | 'PME' | 'ETI' | 'GE';
  employeeCount?: number;
  isActive?: boolean;
  maturityLevel?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  location?: string;
  contact?: string;
}

export class CompanyFilterDto {
  search?: string;
  sector?: string;
  maturityLevel?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// ============ GESTION DES PLANS D'ACTION ============
export class CreateActionPlanDto {
  scoreId: string;
  actions: ActionItemDto[];
  status?: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
}

export class UpdateActionPlanDto {
  actions?: ActionItemDto[];
  status?: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW' | 'IN_PROGRESS' | 'COMPLETED';
  notes?: string;
  adminNotes?: string;
  validatedBy?: string;
  validatedAt?: Date;
}

export class ActionItemDto {
  category: 'Gouvernance' | 'Économie circulaire' | 'Social' | 'Environnemental';
  priority: 'Haute' | 'Moyenne' | 'Faible';
  title: string;
  description: string;
  estimatedCost?: number;
  estimatedDuration?: string;
  expectedImpact?: string;
  resources?: string[];
  kpis?: string[];
}

export class CreateActionPlanTemplateDto {
  name: string;
  description: string;
  sector?: string;
  maturityLevel?: string;
  actions: ActionItemDto[];
  isActive?: boolean;
}

// ============ GESTION DE L'ÉQUIPE ============
export class CreateTeamMemberDto {
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  specialties: string[];
  order?: number;
}

export class UpdateTeamMemberDto {
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

// ============ GESTION DES QUESTIONS ============
export class CreateQuestionDto {
  questionId: string;
  category: string;
  text: string;
  type: 'number' | 'percentage' | 'boolean' | 'text' | 'select' | 'multiselect';
  weight: number;
  sector?: string;
  unit?: string;
  options?: string[];
  choices?: string[];
  isoReference?: string;
  guidance?: QuestionGuidanceDto;
}

export class UpdateQuestionDto {
  category?: string;
  text?: string;
  type?: 'number' | 'percentage' | 'boolean' | 'text' | 'select' | 'multiselect';
  weight?: number;
  sector?: string;
  unit?: string;
  options?: string[];
  choices?: string[];
  isoReference?: string;
  guidance?: QuestionGuidanceDto;
  isActive?: boolean;
}

export class QuestionGuidanceDto {
  howToObtain?: string;
  source?: string;
  sourceUrl?: string;
  example?: string;
  benchmark?: {
    good?: number | string;
    average?: number | string;
    poor?: number | string;
  };
}

// ============ GESTION DES EXPERTS ============
export class AssignExpertDto {
  companyId: string;
  expertId: string;
  role?: string;
  notes?: string;
}

// ============ STATISTIQUES ET DASHBOARD ============
export interface AdminStatsDto {
  totalCompanies: number;
  totalScores: number;
  totalQuestions: number;
  recentCompanies: any[];
  scoresByMonth: { month: string; count: number; averageScore: number }[];
  sectorDistribution: { sector: string; count: number; averageScore: number }[];
  averageScores: {
    global: number;
    governance: number;
    economic: number;
    social: number;
    environmental: number;
  };
  performanceTrends: any[];
  topPerformers: any[];
}

export interface ActivityLogDto {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  createdAt: Date;
  adminUser?: {
    id: string;
    name: string;
    email: string;
  };
}

// ============ MONITORING DU CHATBOT ============
export interface ChatbotStatsDto {
  totalQuestions: number;
  averageResponseTime: number;
  topQuestions: {
    question: string;
    count: number;
  }[];
  errorRate: number;
  apiCost: number;
  documentCount: number;
}

// ============ GÉNÉRATION DE RAPPORTS ============
export class GenerateReportDto {
  companyId: string;
  includeActionPlan?: boolean;
  includeCharts?: boolean;
  format?: 'PDF' | 'EXCEL' | 'JSON';
}

export interface CompanyReportDto {
  company: {
    id: string;
    name: string;
    sector: string;
    email: string;
  };
  evaluation: {
    date: Date;
    globalScore: number;
    maturityLevel: string;
    scores: {
      environmental: number;
      economic: number;
      social: number;
      governance: number;
    };
  };
  actionPlan?: {
    status: string;
    actions: ActionItemDto[];
  };
  trends?: {
    month: string;
    score: number;
  }[];
}
