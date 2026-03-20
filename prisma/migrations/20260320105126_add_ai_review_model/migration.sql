-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "aiStatus" TEXT DEFAULT 'flagged';
