/*
  Warnings:

  - The `typeUser` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "typeusers" AS ENUM ('CLIENT', 'THERAPIST');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "typeUser",
ADD COLUMN     "typeUser" "typeusers" NOT NULL DEFAULT 'CLIENT',
DROP COLUMN "role",
ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "TypeUser";
