-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DELETED', 'ENDED');

-- CreateEnum
CREATE TYPE "CampaignEndType" AS ENUM ('NEVER', 'DATE', 'COUNT');

-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('WORKUA', 'ROBOTAUA', 'LINKEDIN');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "providers" "Providers"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "endType" "CampaignEndType" NOT NULL,
    "endValue" INTEGER,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);
