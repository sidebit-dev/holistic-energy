/*
  Warnings:

  - The `typeAdmin` column on the `admins` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeAdmin" AS ENUM ('OPERACIONAL', 'FINANCEIRO', 'MASTER');

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "typeAdmin",
ADD COLUMN     "typeAdmin" "TypeAdmin" NOT NULL DEFAULT 'OPERACIONAL';
