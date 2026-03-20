-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "aiCheckedAt" TIMESTAMP(3),
ADD COLUMN     "aiLabel" TEXT,
ADD COLUMN     "aiReason" TEXT;
