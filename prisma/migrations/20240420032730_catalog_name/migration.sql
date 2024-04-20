/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Catalog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_name_key" ON "Catalog"("name");
