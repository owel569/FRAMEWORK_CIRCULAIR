-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "DocumentChunk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentChunk_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ChatbotDocument" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "employeeCount" INTEGER,
    "userId" TEXT,
    "tonnageLogistique" REAL,
    "emissionsLogistiques" REAL,
    "tonnageAlternatif" REAL,
    "coutActuel" REAL,
    "coutTraitement" REAL,
    "centreActuel" REAL,
    "centreAlternatif" REAL,
    "electriciteKWh" REAL,
    "gazKWh" REAL,
    "eauM3" REAL,
    "carburantsLitres" REAL,
    "consommationEau" REAL,
    "consommationCarburant" REAL,
    "emissionsScope12" REAL,
    "heuresFormation" REAL,
    "partAchatsLocaux" REAL,
    "partEmploisLocaux" REAL,
    "dechetsTotaux" REAL,
    "dechetsValorises" REAL,
    "pourcentageValorisation" REAL,
    "dechetsDangereux" REAL,
    "depensesMaintenanceMad" REAL,
    "dureeVieEquipementAns" REAL,
    "tauxRebutPct" REAL,
    "beneficeEconomique" REAL,
    "coutAlternatifMad" REAL,
    "economiePotentielleMad" REAL,
    "tauxUtilisationEqPct" REAL,
    "matieresRecycleesMad" REAL,
    "achatsResponsablesPct" REAL,
    "partEmploisLocauxPct" REAL,
    "recrutementAn" REAL,
    "heuresFormationSalarieAn" REAL,
    "partFemmesPct" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("achatsResponsablesPct", "beneficeEconomique", "carburantsLitres", "centreActuel", "centreAlternatif", "consommationCarburant", "consommationEau", "coutActuel", "coutAlternatifMad", "coutTraitement", "createdAt", "dechetsDangereux", "dechetsTotaux", "dechetsValorises", "depensesMaintenanceMad", "dureeVieEquipementAns", "eauM3", "economiePotentielleMad", "electriciteKWh", "email", "emissionsLogistiques", "emissionsScope12", "employeeCount", "gazKWh", "heuresFormation", "heuresFormationSalarieAn", "id", "matieresRecycleesMad", "name", "partAchatsLocaux", "partEmploisLocaux", "partEmploisLocauxPct", "partFemmesPct", "phone", "pourcentageValorisation", "recrutementAn", "sector", "tauxRebutPct", "tauxUtilisationEqPct", "tonnageAlternatif", "tonnageLogistique", "updatedAt") SELECT "achatsResponsablesPct", "beneficeEconomique", "carburantsLitres", "centreActuel", "centreAlternatif", "consommationCarburant", "consommationEau", "coutActuel", "coutAlternatifMad", "coutTraitement", "createdAt", "dechetsDangereux", "dechetsTotaux", "dechetsValorises", "depensesMaintenanceMad", "dureeVieEquipementAns", "eauM3", "economiePotentielleMad", "electriciteKWh", "email", "emissionsLogistiques", "emissionsScope12", "employeeCount", "gazKWh", "heuresFormation", "heuresFormationSalarieAn", "id", "matieresRecycleesMad", "name", "partAchatsLocaux", "partEmploisLocaux", "partEmploisLocauxPct", "partFemmesPct", "phone", "pourcentageValorisation", "recrutementAn", "sector", "tauxRebutPct", "tauxUtilisationEqPct", "tonnageAlternatif", "tonnageLogistique", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "DocumentChunk_documentId_idx" ON "DocumentChunk"("documentId");
