/*
  Warnings:

  - You are about to drop the `pistsxpies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pistsxpies" DROP CONSTRAINT "pistsxpies_therapist_id_fkey";

-- DropForeignKey
ALTER TABLE "pistsxpies" DROP CONSTRAINT "pistsxpies_therapy_id_fkey";

-- DropTable
DROP TABLE "pistsxpies";

-- CreateTable
CREATE TABLE "therapistsOnTherapies" (
    "therapy_id" TEXT NOT NULL,
    "therapist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "therapistsOnTherapies_pkey" PRIMARY KEY ("therapy_id","therapist_id")
);

-- AddForeignKey
ALTER TABLE "therapistsOnTherapies" ADD CONSTRAINT "therapistsOnTherapies_therapy_id_fkey" FOREIGN KEY ("therapy_id") REFERENCES "therapies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "therapistsOnTherapies" ADD CONSTRAINT "therapistsOnTherapies_therapist_id_fkey" FOREIGN KEY ("therapist_id") REFERENCES "therapists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
