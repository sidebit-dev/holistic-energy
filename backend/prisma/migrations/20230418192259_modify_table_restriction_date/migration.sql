/*
  Warnings:

  - You are about to drop the column `date_id` on the `restriction_hour` table. All the data in the column will be lost.
  - Added the required column `restrictionDate_id` to the `restriction_hour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restriction_hour" DROP CONSTRAINT "restriction_hour_date_id_fkey";

-- AlterTable
ALTER TABLE "restriction_hour" DROP COLUMN "date_id",
ADD COLUMN     "restrictionDate_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "restriction_hour" ADD CONSTRAINT "restriction_hour_restrictionDate_id_fkey" FOREIGN KEY ("restrictionDate_id") REFERENCES "restriction_date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
