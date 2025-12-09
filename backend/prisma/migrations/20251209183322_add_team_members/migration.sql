-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'EXPERT', 'VIEWER');

-- CreateEnum
CREATE TYPE "ActionPlanStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tonnageLogistique" DOUBLE PRECISION,
    "emissionsLogistiques" DOUBLE PRECISION,
    "tonnageAlternatif" DOUBLE PRECISION,
    "coutActuel" DOUBLE PRECISION,
    "coutTraitement" DOUBLE PRECISION,
    "centreActuel" DOUBLE PRECISION,
    "centreAlternatif" DOUBLE PRECISION,
    "electriciteKWh" DOUBLE PRECISION,
    "gazKWh" DOUBLE PRECISION,
    "eauM3" DOUBLE PRECISION,
    "carburantsLitres" DOUBLE PRECISION,
    "consommationEau" DOUBLE PRECISION,
    "consommationCarburant" DOUBLE PRECISION,
    "emissionsScope12" DOUBLE PRECISION,
    "heuresFormation" DOUBLE PRECISION,
    "partAchatsLocaux" DOUBLE PRECISION,
    "partEmploisLocaux" DOUBLE PRECISION,
    "dechetsTotaux" DOUBLE PRECISION,
    "dechetsValorises" DOUBLE PRECISION,
    "pourcentageValorisation" DOUBLE PRECISION,
    "dechetsDangereux" DOUBLE PRECISION,
    "depensesMaintenanceMad" DOUBLE PRECISION,
    "dureeVieEquipementAns" DOUBLE PRECISION,
    "tauxRebutPct" DOUBLE PRECISION,
    "beneficeEconomique" DOUBLE PRECISION,
    "coutAlternatifMad" DOUBLE PRECISION,
    "economiePotentielleMad" DOUBLE PRECISION,
    "tauxUtilisationEqPct" DOUBLE PRECISION,
    "matieresRecycleesMad" DOUBLE PRECISION,
    "achatsResponsablesPct" DOUBLE PRECISION,
    "partEmploisLocauxPct" DOUBLE PRECISION,
    "recrutementAn" DOUBLE PRECISION,
    "heuresFormationSalarieAn" DOUBLE PRECISION,
    "partFemmesPct" DOUBLE PRECISION,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "governanceScore" DOUBLE PRECISION NOT NULL,
    "economicScore" DOUBLE PRECISION NOT NULL,
    "socialScore" DOUBLE PRECISION NOT NULL,
    "environmentalScore" DOUBLE PRECISION NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "maturityLevel" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionPlan" (
    "id" TEXT NOT NULL,
    "scoreId" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorAverage" (
    "id" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "avgScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SectorAverage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'EXPERT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAssignment" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT,
    "companyId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionPlanTemplate" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "maturityLevel" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionPlanTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyActionPlan" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "scoreId" TEXT NOT NULL,
    "actions" TEXT NOT NULL,
    "status" "ActionPlanStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "validatedAt" TIMESTAMP(3),
    "validatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyActionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotMetrics" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "wasHelpful" BOOLEAN,
    "source" TEXT NOT NULL,
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionnaireQuestion" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "choices" TEXT,
    "isoReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionnaireQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotDocument" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wordCount" INTEGER,
    "language" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3),

    CONSTRAINT "ChatbotDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentChunk" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemoMode" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemoMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin" TEXT,
    "specialties" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE INDEX "Score_companyId_idx" ON "Score"("companyId");

-- CreateIndex
CREATE INDEX "Score_maturityLevel_idx" ON "Score"("maturityLevel");

-- CreateIndex
CREATE UNIQUE INDEX "ActionPlan_scoreId_key" ON "ActionPlan"("scoreId");

-- CreateIndex
CREATE UNIQUE INDEX "SectorAverage_sector_key" ON "SectorAverage"("sector");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAssignment_companyId_adminUserId_key" ON "CompanyAssignment"("companyId", "adminUserId");

-- CreateIndex
CREATE INDEX "ActivityLog_adminUserId_idx" ON "ActivityLog"("adminUserId");

-- CreateIndex
CREATE INDEX "ActivityLog_companyId_idx" ON "ActivityLog"("companyId");

-- CreateIndex
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");

-- CreateIndex
CREATE INDEX "CompanyActionPlan_companyId_idx" ON "CompanyActionPlan"("companyId");

-- CreateIndex
CREATE INDEX "CompanyActionPlan_status_idx" ON "CompanyActionPlan"("status");

-- CreateIndex
CREATE INDEX "ChatbotMetrics_createdAt_idx" ON "ChatbotMetrics"("createdAt");

-- CreateIndex
CREATE INDEX "ChatbotMetrics_confidence_idx" ON "ChatbotMetrics"("confidence");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireQuestion_questionId_key" ON "QuestionnaireQuestion"("questionId");

-- CreateIndex
CREATE INDEX "DocumentChunk_documentId_idx" ON "DocumentChunk"("documentId");

-- CreateIndex
CREATE INDEX "TeamMember_order_idx" ON "TeamMember"("order");

-- CreateIndex
CREATE INDEX "TeamMember_isActive_idx" ON "TeamMember"("isActive");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlan" ADD CONSTRAINT "ActionPlan_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAssignment" ADD CONSTRAINT "CompanyAssignment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAssignment" ADD CONSTRAINT "CompanyAssignment_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyActionPlan" ADD CONSTRAINT "CompanyActionPlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyActionPlan" ADD CONSTRAINT "CompanyActionPlan_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatbotMetrics" ADD CONSTRAINT "ChatbotMetrics_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentChunk" ADD CONSTRAINT "DocumentChunk_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ChatbotDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
