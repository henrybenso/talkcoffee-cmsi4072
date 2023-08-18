/*
  Warnings:

  - The values [NONE] on the enum `StoreTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StoreTypes_new" AS ENUM ('CAFE_SIT_IN', 'CAFE_TAKE_OUT', 'BAR_SIT_IN');
ALTER TABLE "ServiceTypes" ALTER COLUMN "sitIn" DROP DEFAULT;
ALTER TABLE "ServiceTypes" ALTER COLUMN "sitIn" TYPE "StoreTypes_new"[] USING ("sitIn"::text::"StoreTypes_new"[]);
ALTER TYPE "StoreTypes" RENAME TO "StoreTypes_old";
ALTER TYPE "StoreTypes_new" RENAME TO "StoreTypes";
DROP TYPE "StoreTypes_old";
ALTER TABLE "ServiceTypes" ALTER COLUMN "sitIn" SET DEFAULT ARRAY[]::"StoreTypes"[];
COMMIT;

-- AlterTable
ALTER TABLE "ServiceTypes" ALTER COLUMN "sitIn" SET DEFAULT ARRAY[]::"StoreTypes"[];
