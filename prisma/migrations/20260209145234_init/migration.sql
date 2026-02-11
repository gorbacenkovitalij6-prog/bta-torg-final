-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image" TEXT NOT NULL,
    "price" INTEGER,
    "brand" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "mileage" INTEGER,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
