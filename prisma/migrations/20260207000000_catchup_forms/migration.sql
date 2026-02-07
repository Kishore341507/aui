-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" TEXT;

-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('PENDING', 'ACCEPTED', 'UNDER_REVIEW', 'REJECTED');

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "status" "FormStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);
