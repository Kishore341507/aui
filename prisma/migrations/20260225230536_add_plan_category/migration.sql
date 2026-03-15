-- CreateEnum
CREATE TYPE "PlanCategory" AS ENUM ('BASIC', 'POPULAR', 'EXCLUSIVE');

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "category" "PlanCategory" NOT NULL DEFAULT 'BASIC';
