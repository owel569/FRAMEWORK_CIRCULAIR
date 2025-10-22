-- DropIndex
DROP INDEX "Company_email_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN "achatsResponsablesPct" REAL;
ALTER TABLE "Company" ADD COLUMN "beneficeEconomique" REAL;
ALTER TABLE "Company" ADD COLUMN "carburantsLitres" REAL;
ALTER TABLE "Company" ADD COLUMN "centreActuel" REAL;
ALTER TABLE "Company" ADD COLUMN "centreAlternatif" REAL;
ALTER TABLE "Company" ADD COLUMN "consommationCarburant" REAL;
ALTER TABLE "Company" ADD COLUMN "consommationEau" REAL;
ALTER TABLE "Company" ADD COLUMN "coutActuel" REAL;
ALTER TABLE "Company" ADD COLUMN "coutAlternatifMad" REAL;
ALTER TABLE "Company" ADD COLUMN "coutTraitement" REAL;
ALTER TABLE "Company" ADD COLUMN "dechetsDangereux" REAL;
ALTER TABLE "Company" ADD COLUMN "dechetsTotaux" REAL;
ALTER TABLE "Company" ADD COLUMN "dechetsValorises" REAL;
ALTER TABLE "Company" ADD COLUMN "depensesMaintenanceMad" REAL;
ALTER TABLE "Company" ADD COLUMN "dureeVieEquipementAns" REAL;
ALTER TABLE "Company" ADD COLUMN "eauM3" REAL;
ALTER TABLE "Company" ADD COLUMN "economiePotentielleMad" REAL;
ALTER TABLE "Company" ADD COLUMN "electriciteKWh" REAL;
ALTER TABLE "Company" ADD COLUMN "emissionsLogistiques" REAL;
ALTER TABLE "Company" ADD COLUMN "emissionsScope12" REAL;
ALTER TABLE "Company" ADD COLUMN "employeeCount" INTEGER;
ALTER TABLE "Company" ADD COLUMN "gazKWh" REAL;
ALTER TABLE "Company" ADD COLUMN "heuresFormation" REAL;
ALTER TABLE "Company" ADD COLUMN "heuresFormationSalarieAn" REAL;
ALTER TABLE "Company" ADD COLUMN "matieresRecycleesMad" REAL;
ALTER TABLE "Company" ADD COLUMN "partAchatsLocaux" REAL;
ALTER TABLE "Company" ADD COLUMN "partEmploisLocaux" REAL;
ALTER TABLE "Company" ADD COLUMN "partEmploisLocauxPct" REAL;
ALTER TABLE "Company" ADD COLUMN "partFemmesPct" REAL;
ALTER TABLE "Company" ADD COLUMN "pourcentageValorisation" REAL;
ALTER TABLE "Company" ADD COLUMN "recrutementAn" REAL;
ALTER TABLE "Company" ADD COLUMN "tauxRebutPct" REAL;
ALTER TABLE "Company" ADD COLUMN "tauxUtilisationEqPct" REAL;
ALTER TABLE "Company" ADD COLUMN "tonnageAlternatif" REAL;
ALTER TABLE "Company" ADD COLUMN "tonnageLogistique" REAL;

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionnaireQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "unit" TEXT,
    "choices" TEXT,
    "isoReference" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireQuestion_questionId_key" ON "QuestionnaireQuestion"("questionId");
