/*
  Warnings:

  - You are about to drop the column `thepapist_id` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `therapist_id` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_thepapist_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "thepapist_id",
ADD COLUMN     "therapist_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_therapist_id_fkey" FOREIGN KEY ("therapist_id") REFERENCES "therapists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
