-- CreateTable
CREATE TABLE "SectorBenchmark" (
    "id" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "employeeRange" TEXT NOT NULL,
    "indicator" TEXT NOT NULL,
    "indicatorCategory" TEXT NOT NULL,
    "averageValue" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "source" TEXT,
    "year" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectorBenchmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SectorBenchmark_sector_idx" ON "SectorBenchmark"("sector");

-- CreateIndex
CREATE INDEX "SectorBenchmark_indicator_idx" ON "SectorBenchmark"("indicator");

-- CreateIndex
CREATE UNIQUE INDEX "SectorBenchmark_sector_employeeRange_indicator_key" ON "SectorBenchmark"("sector", "employeeRange", "indicator");
