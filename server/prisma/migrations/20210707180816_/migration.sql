/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserRoles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRoles.name_unique" ON "UserRoles"("name");
