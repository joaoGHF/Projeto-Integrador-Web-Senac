/*
  Warnings:

  - You are about to drop the column `gameId` on the `genre` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_gameTogenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_gameTogenre_A_fkey" FOREIGN KEY ("A") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_gameTogenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_genre" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "genre";
DROP TABLE "genre";
ALTER TABLE "new_genre" RENAME TO "genre";
CREATE UNIQUE INDEX "genre_id_key" ON "genre"("id");
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_gameTogenre_AB_unique" ON "_gameTogenre"("A", "B");

-- CreateIndex
CREATE INDEX "_gameTogenre_B_index" ON "_gameTogenre"("B");
