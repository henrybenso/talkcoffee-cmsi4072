/*
  Warnings:

  - A unique constraint covering the columns `[serviceTypesId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceTypesId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "serviceTypesId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ServiceTypes" (
    "id" TEXT NOT NULL,
    "sitInId" TEXT NOT NULL,
    "takeOut" BOOLEAN NOT NULL,
    "delivery" BOOLEAN NOT NULL,

    CONSTRAINT "ServiceTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "type" "DineTypes" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTypes_sitInId_key" ON "ServiceTypes"("sitInId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_serviceTypesId_key" ON "Store"("serviceTypesId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceTypesId_fkey" FOREIGN KEY ("serviceTypesId") REFERENCES "ServiceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTypes" ADD CONSTRAINT "ServiceTypes_sitInId_fkey" FOREIGN KEY ("sitInId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
