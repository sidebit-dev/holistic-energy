-- DropIndex
DROP INDEX "therapist_therapy_therapist_id_therapy_id_key";

-- AlterTable
ALTER TABLE "therapist_therapy" ADD CONSTRAINT "therapist_therapy_pkey" PRIMARY KEY ("therapist_id", "therapy_id");
