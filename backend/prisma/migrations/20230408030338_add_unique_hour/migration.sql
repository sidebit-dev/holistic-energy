/*
  Warnings:

  - A unique constraint covering the columns `[hour]` on the table `hours` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "hours_hour_key" ON "hours"("hour");
