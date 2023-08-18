/*
  Warnings:

  - You are about to drop the column `instagram` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "instagram",
ADD COLUMN     "instagramHandle" TEXT;
