/*
  Warnings:

  - You are about to drop the column `scheduledDate` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledTime` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "scheduledDate",
DROP COLUMN "scheduledTime",
ADD COLUMN     "scheduleDate" TIMESTAMP(3);
