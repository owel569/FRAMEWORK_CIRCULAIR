-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "globalScore" REAL NOT NULL,
    "governanceScore" REAL NOT NULL,
    "economicScore" REAL NOT NULL,
    "socialScore" REAL NOT NULL,
    "responses" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Score_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scoreId" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ActionPlan_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SectorAverage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sector" TEXT NOT NULL,
    "avgScore" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ActionPlan_scoreId_key" ON "ActionPlan"("scoreId");

-- CreateIndex
CREATE UNIQUE INDEX "SectorAverage_sector_key" ON "SectorAverage"("sector");
