/*
  Warnings:

  - A unique constraint covering the columns `[serviceHoursId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceHoursId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "serviceHoursId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ServiceHours" (
    "id" TEXT NOT NULL,
    "mondayOpen" TIMESTAMP(3) NOT NULL,
    "mondayClose" TIMESTAMP(3) NOT NULL,
    "tuesdayOpen" TIMESTAMP(3) NOT NULL,
    "tuesdayClose" TIMESTAMP(3) NOT NULL,
    "wednesdayOpen" TIMESTAMP(3) NOT NULL,
    "wednesdayClose" TIMESTAMP(3) NOT NULL,
    "thursdayOpen" TIMESTAMP(3) NOT NULL,
    "thursdayClose" TIMESTAMP(3) NOT NULL,
    "fridayOpen" TIMESTAMP(3) NOT NULL,
    "fridayClose" TIMESTAMP(3) NOT NULL,
    "saturdayOpen" TIMESTAMP(3) NOT NULL,
    "saturdayClose" TIMESTAMP(3) NOT NULL,
    "sundayOpen" TIMESTAMP(3) NOT NULL,
    "sundayClose" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_serviceHoursId_key" ON "Store"("serviceHoursId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceHoursId_fkey" FOREIGN KEY ("serviceHoursId") REFERENCES "ServiceHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
