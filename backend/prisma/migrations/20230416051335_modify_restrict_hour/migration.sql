/*
  Warnings:

  - Added the required column `date_id` to the `restriction_hour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restriction_hour" DROP CONSTRAINT "restriction_hour_id_fkey";

-- AlterTable
ALTER TABLE "restriction_hour" ADD COLUMN     "date_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "restriction_hour" ADD CONSTRAINT "restriction_hour_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "restriction_date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
