/*
  Warnings:

  - You are about to drop the column `restrictionDate` on the `restriction_date` table. All the data in the column will be lost.
  - You are about to drop the column `restrictionHour` on the `restriction_date` table. All the data in the column will be lost.
  - Added the required column `date` to the `restriction_date` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restriction_date" DROP COLUMN "restrictionDate",
DROP COLUMN "restrictionHour",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "restriction_hour" (
    "id" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restriction_hour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restriction_hour" ADD CONSTRAINT "restriction_hour_id_fkey" FOREIGN KEY ("id") REFERENCES "restriction_date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
