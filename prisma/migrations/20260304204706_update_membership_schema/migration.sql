-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "amount" DECIMAL(10,2),
ADD COLUMN     "discordUserId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
