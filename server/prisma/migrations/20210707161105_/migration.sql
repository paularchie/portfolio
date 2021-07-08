/*
  Warnings:

  - You are about to drop the column `userId` on the `UserRoles` table. All the data in the column will be lost.
  - Added the required column `rolesId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_UserToUserRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "UserRoles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRoles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL
);
INSERT INTO "new_UserRoles" ("id", "role") SELECT "id", "role" FROM "UserRoles";
DROP TABLE "UserRoles";
ALTER TABLE "new_UserRoles" RENAME TO "UserRoles";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolesId" INTEGER NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE UNIQUE INDEX "User.rolesId_unique" ON "User"("rolesId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserRoles_AB_unique" ON "_UserToUserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserRoles_B_index" ON "_UserToUserRoles"("B");
