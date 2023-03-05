/*
  Warnings:

  - You are about to drop the `Hour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_thepapist_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_therapy_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_user_id_fkey";

-- DropTable
DROP TABLE "Hour";

-- DropTable
DROP TABLE "schedule";

-- CreateTable
CREATE TABLE "hours" (
    "id" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3),
    "therapy_id" TEXT NOT NULL,
    "thepapist_id" TEXT NOT NULL,
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "hour_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_hour_id_fkey" FOREIGN KEY ("hour_id") REFERENCES "hours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_therapy_id_fkey" FOREIGN KEY ("therapy_id") REFERENCES "therapies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_thepapist_id_fkey" FOREIGN KEY ("thepapist_id") REFERENCES "therapists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
