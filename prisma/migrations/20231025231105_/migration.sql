/*
  Warnings:

  - You are about to drop the column `serviceHoursId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `serviceTypesId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceHours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceTypes" DROP CONSTRAINT "ServiceTypes_sitInId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_serviceHoursId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_serviceTypesId_fkey";

-- DropIndex
DROP INDEX "Store_serviceHoursId_key";

-- DropIndex
DROP INDEX "Store_serviceTypesId_key";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "serviceHoursId",
DROP COLUMN "serviceTypesId";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "ServiceHours";

-- DropTable
DROP TABLE "ServiceTypes";
