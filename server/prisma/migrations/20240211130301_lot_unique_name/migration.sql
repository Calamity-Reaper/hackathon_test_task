/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `lots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lots_name_key" ON "lots"("name");
