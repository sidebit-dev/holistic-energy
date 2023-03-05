-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('CLIENT', 'THERAPIST');

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "birthday" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "typeUser" "TypeUser" NOT NULL DEFAULT 'CLIENT';
