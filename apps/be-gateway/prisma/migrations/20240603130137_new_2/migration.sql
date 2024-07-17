/*
  Warnings:

  - The `providers` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "providers",
ADD COLUMN     "providers" "Providers"[];
