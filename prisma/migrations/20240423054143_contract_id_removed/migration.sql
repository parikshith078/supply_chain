/*
  Warnings:

  - You are about to drop the column `contractId` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discrption" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "dateOfHarvest" DATETIME NOT NULL,
    "isAvialable" BOOLEAN NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("catalogId", "category", "createdAt", "dateOfHarvest", "discrption", "id", "imageUrl", "isAvialable", "name", "ownerId", "price", "quantity", "updatedAt") SELECT "catalogId", "category", "createdAt", "dateOfHarvest", "discrption", "id", "imageUrl", "isAvialable", "name", "ownerId", "price", "quantity", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
