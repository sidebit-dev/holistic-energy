/*
  Warnings:

  - Added the required column `therapist_id` to the `restriction_date` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restriction_date" DROP CONSTRAINT "restriction_date_id_fkey";

-- DropIndex
DROP INDEX "restriction_date_id_key";

-- AlterTable
ALTER TABLE "restriction_date" ADD COLUMN     "therapist_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "restriction_date" ADD CONSTRAINT "restriction_date_therapist_id_fkey" FOREIGN KEY ("therapist_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
