/*
  Warnings:

  - You are about to drop the column `countRatings` on the `Store` table. All the data in the column will be lost.
  - Added the required column `ratingCount` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "countRatings",
ADD COLUMN     "ratingCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "beans" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
