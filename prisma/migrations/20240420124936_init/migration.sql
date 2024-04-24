-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "actorType" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "msp" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discrption" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "dateOfHarvest" DATETIME NOT NULL,
    "isAvialable" BOOLEAN NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Actor_publicKey_key" ON "Actor"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_email_key" ON "Actor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_contractId_key" ON "Product"("contractId");
