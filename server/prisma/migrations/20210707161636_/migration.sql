/*
  Warnings:

  - You are about to drop the column `role` on the `UserRoles` table. All the data in the column will be lost.
  - Added the required column `name` to the `UserRoles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRoles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_UserRoles" ("id") SELECT "id" FROM "UserRoles";
DROP TABLE "UserRoles";
ALTER TABLE "new_UserRoles" RENAME TO "UserRoles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
