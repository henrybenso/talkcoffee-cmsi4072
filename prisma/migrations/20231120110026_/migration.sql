/*
  Warnings:

  - Added the required column `curbsidePickup` to the `ServiceTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceTypes" ADD COLUMN     "curbsidePickup" BOOLEAN NOT NULL;
