-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'PREMIUM', 'ADMIN');

-- CreateEnum
CREATE TYPE "DineTypes" AS ENUM ('CAFE', 'BAR');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'TR', 'FRI', 'SAT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "beans" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "passwordHash" TEXT NOT NULL,
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
    "instagramHandle" TEXT,
    "avatarImageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceTypesId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTypes" (
    "id" TEXT NOT NULL,
    "sitIn" "DineTypes"[],
    "takeOut" BOOLEAN NOT NULL,
    "delivery" BOOLEAN NOT NULL,
    "curbsidePickup" BOOLEAN NOT NULL,

    CONSTRAINT "ServiceTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceHours" (
    "id" TEXT NOT NULL,
    "day" "Days" NOT NULL,
    "open" TIMESTAMP(3) NOT NULL,
    "close" TIMESTAMP(3) NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "ServiceHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarImage" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "AvatarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_avatarImageId_key" ON "Store"("avatarImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_serviceTypesId_key" ON "Store"("serviceTypesId");

-- CreateIndex
CREATE UNIQUE INDEX "AvatarImage_publicId_key" ON "AvatarImage"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_publicId_key" ON "Image"("publicId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_avatarImageId_fkey" FOREIGN KEY ("avatarImageId") REFERENCES "AvatarImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_serviceTypesId_fkey" FOREIGN KEY ("serviceTypesId") REFERENCES "ServiceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceHours" ADD CONSTRAINT "ServiceHours_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
