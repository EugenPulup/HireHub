-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_campaignId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Unspecified',
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "age" SET DEFAULT 0,
ALTER COLUMN "typeOfWork" DROP NOT NULL,
ALTER COLUMN "typeOfWork" SET DEFAULT 'Unspecified',
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "position" SET DEFAULT 'Unspecified',
ALTER COLUMN "salaryExpectation" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
