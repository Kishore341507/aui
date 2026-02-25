-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "allFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "expandableFeatures" JSONB,
ADD COLUMN     "isGiftable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSupportable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxCount" INTEGER;
