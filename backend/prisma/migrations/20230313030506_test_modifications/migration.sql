/*
  Warnings:

  - The primary key for the `therapist_therapy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `therapist_therapy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "therapist_therapy" DROP CONSTRAINT "therapist_therapy_pkey",
DROP COLUMN "id";
