/*
  Warnings:

  - You are about to drop the column `releasedate` on the `game` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoURL` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "systemRequirements" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "accessLink" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "distributor" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "imageURL" TEXT NOT NULL,
    "videoURL" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_game" ("accessLink", "created_at", "description", "developer", "distributor", "id", "name", "platform", "price", "systemRequirements", "updated_at") SELECT "accessLink", "created_at", "description", "developer", "distributor", "id", "name", "platform", "price", "systemRequirements", "updated_at" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
CREATE UNIQUE INDEX "game_id_key" ON "game"("id");
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
