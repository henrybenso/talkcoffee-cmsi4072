/*
  Warnings:

  - You are about to drop the column `close` on the `ServiceHours` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `ServiceHours` table. All the data in the column will be lost.
  - The `sitIn` column on the `ServiceTypes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fridayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fridayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mondayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mondayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saturdayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saturdayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sundayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sundayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thursdayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thursdayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuesdayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuesdayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wednesdayClose` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wednesdayOpen` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoreTypes" AS ENUM ('CAFE_SIT_IN', 'CAFE_TAKE_OUT', 'BAR_SIT_IN', 'NONE');

-- AlterTable
ALTER TABLE "ServiceHours" DROP COLUMN "close",
DROP COLUMN "open",
ADD COLUMN     "fridayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fridayOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mondayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mondayOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "saturdayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "saturdayOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sundayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sundayOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "thursdayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "thursdayOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tuesdayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tuesdayOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "wednesdayClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "wednesdayOpen" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ServiceTypes" DROP COLUMN "sitIn",
ADD COLUMN     "sitIn" "StoreTypes"[] DEFAULT ARRAY['NONE']::"StoreTypes"[];

-- DropEnum
DROP TYPE "StoreType";
