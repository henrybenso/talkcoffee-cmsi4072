-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'PREMIUM', 'ADMIN');

-- CreateEnum
CREATE TYPE "StoreType" AS ENUM ('CAFE_SIT_IN', 'CAFE_TAKE_OUT', 'BAR_SIT_IN', 'NONE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "age" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "birthDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "phoneNumber" TEXT,
    "instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceTypesId" TEXT NOT NULL,
    "serviceHoursId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTypes" (
    "id" TEXT NOT NULL,
    "sitIn" "StoreType"[] DEFAULT ARRAY['NONE']::"StoreType"[],
    "takeOut" BOOLEAN NOT NULL,
    "delivery" BOOLEAN NOT NULL,

    CONSTRAINT "ServiceTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceHours" (
    "id" TEXT NOT NULL,
    "open" TIMESTAMP(3) NOT NULL,
    "close" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_serviceTypesId_key" ON "Store"("serviceTypesId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_serviceHoursId_key" ON "Store"("serviceHoursId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceTypesId_fkey" FOREIGN KEY ("serviceTypesId") REFERENCES "ServiceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceHoursId_fkey" FOREIGN KEY ("serviceHoursId") REFERENCES "ServiceHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
