/*
  Warnings:

  - You are about to drop the `coment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `descrition` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `rating` table. All the data in the column will be lost.
  - You are about to alter the column `value` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `description` to the `game` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `gameId` to the `genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "coment_username_key";

-- DropIndex
DROP INDEX "coment_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "coment";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "releasedate" DATETIME NOT NULL,
    "systemRequirements" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "accessLink" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "distributor" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_game" ("accessLink", "created_at", "developer", "distributor", "id", "name", "platform", "price", "releasedate", "systemRequirements", "updated_at") SELECT "accessLink", "created_at", "developer", "distributor", "id", "name", "platform", "price", "releasedate", "systemRequirements", "updated_at" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
CREATE UNIQUE INDEX "game_id_key" ON "game"("id");
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");
CREATE TABLE "new_genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "genre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_genre" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "genre";
DROP TABLE "genre";
ALTER TABLE "new_genre" RENAME TO "genre";
CREATE UNIQUE INDEX "genre_id_key" ON "genre"("id");
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");
CREATE TABLE "new_rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rating" ("created_at", "id", "updated_at", "value") SELECT "created_at", "id", "updated_at", "value" FROM "rating";
DROP TABLE "rating";
ALTER TABLE "new_rating" RENAME TO "rating";
CREATE UNIQUE INDEX "rating_id_key" ON "rating"("id");
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_user" ("cpf", "created_at", "email", "id", "name", "password", "updated_at", "username") SELECT "cpf", "created_at", "email", "id", "name", "password", "updated_at", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
