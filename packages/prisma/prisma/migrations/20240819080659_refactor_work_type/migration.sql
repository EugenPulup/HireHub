/*
  Warnings:

  - The `workTime` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkTime" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'UNDEFINED');

-- CreateEnum
CREATE TYPE "WorkLocation" AS ENUM ('REMOTE', 'OFFICE', 'MIXED', 'UNDEFINED');

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_candidateId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workLocation" "WorkLocation" NOT NULL DEFAULT 'UNDEFINED',
DROP COLUMN "workTime",
ADD COLUMN     "workTime" "WorkTime" NOT NULL DEFAULT 'UNDEFINED';

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
