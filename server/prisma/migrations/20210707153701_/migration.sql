/*
  Warnings:

  - Added the required column `userId` to the `UserRoles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRoles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO "new_User" ("email", "id", "password", "rolesId", "username") SELECT "email", "id", "password", "rolesId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE UNIQUE INDEX "User.rolesId_unique" ON "User"("rolesId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
