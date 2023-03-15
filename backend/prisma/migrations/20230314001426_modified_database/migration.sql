/*
  Warnings:

  - The primary key for the `therapist_therapy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `therapist_therapy` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "admins_user_id_key";

-- DropIndex
DROP INDEX "clients_user_id_key";

-- DropIndex
DROP INDEX "therapists_user_id_key";

-- AlterTable
ALTER TABLE "therapist_therapy" DROP CONSTRAINT "therapist_therapy_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "therapist_therapy_pkey" PRIMARY KEY ("id");
