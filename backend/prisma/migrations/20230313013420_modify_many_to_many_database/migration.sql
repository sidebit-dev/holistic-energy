/*
  Warnings:

  - You are about to drop the `therapistsOnTherapies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "therapistsOnTherapies" DROP CONSTRAINT "therapistsOnTherapies_therapist_id_fkey";

-- DropForeignKey
ALTER TABLE "therapistsOnTherapies" DROP CONSTRAINT "therapistsOnTherapies_therapy_id_fkey";

-- DropTable
DROP TABLE "therapistsOnTherapies";

-- CreateTable
CREATE TABLE "therapist_therapy" (
    "id" TEXT NOT NULL,
    "therapist_id" TEXT NOT NULL,
    "therapy_id" TEXT NOT NULL,

    CONSTRAINT "therapist_therapy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "therapist_therapy_therapist_id_therapy_id_key" ON "therapist_therapy"("therapist_id", "therapy_id");

-- AddForeignKey
ALTER TABLE "therapist_therapy" ADD CONSTRAINT "therapist_therapy_therapist_id_fkey" FOREIGN KEY ("therapist_id") REFERENCES "therapists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "therapist_therapy" ADD CONSTRAINT "therapist_therapy_therapy_id_fkey" FOREIGN KEY ("therapy_id") REFERENCES "therapies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
