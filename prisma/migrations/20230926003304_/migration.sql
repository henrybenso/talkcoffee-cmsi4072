/*
  Warnings:

  - Changed the type of `type` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DineTypes" AS ENUM ('CAFE', 'BAR');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "type" "DineTypes" NOT NULL;

-- DropEnum
DROP TYPE "StoreTypes";
