-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'PREMIUM', 'ADMIN');

-- CreateEnum
CREATE TYPE "StoreTypes" AS ENUM ('CAFE', 'BAR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "beans" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "hashedPassword" TEXT NOT NULL,
    "avatar" TEXT,
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
    "ratingCount" INTEGER NOT NULL,
    "phoneNumber" TEXT,
    "avatar" TEXT,
    "photos" TEXT[],
    "instagramHandle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceTypesId" TEXT NOT NULL,
    "serviceHoursId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTypes" (
    "id" TEXT NOT NULL,
    "sitInId" TEXT NOT NULL,
    "takeOut" BOOLEAN NOT NULL,
    "delivery" BOOLEAN NOT NULL,

    CONSTRAINT "ServiceTypes_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "type" "StoreTypes" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTypes_sitInId_key" ON "ServiceTypes"("sitInId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceTypesId_fkey" FOREIGN KEY ("serviceTypesId") REFERENCES "ServiceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceHoursId_fkey" FOREIGN KEY ("serviceHoursId") REFERENCES "ServiceHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTypes" ADD CONSTRAINT "ServiceTypes_sitInId_fkey" FOREIGN KEY ("sitInId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
