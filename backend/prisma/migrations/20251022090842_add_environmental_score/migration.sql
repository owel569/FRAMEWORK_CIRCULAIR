/*
  Warnings:

  - Added the required column `environmentalScore` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "globalScore" REAL NOT NULL,
    "governanceScore" REAL NOT NULL,
    "economicScore" REAL NOT NULL,
    "socialScore" REAL NOT NULL,
    "environmentalScore" REAL NOT NULL,
    "responses" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Score_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("companyId", "createdAt", "economicScore", "globalScore", "governanceScore", "id", "responses", "socialScore", "updatedAt") SELECT "companyId", "createdAt", "economicScore", "globalScore", "governanceScore", "id", "responses", "socialScore", "updatedAt" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
