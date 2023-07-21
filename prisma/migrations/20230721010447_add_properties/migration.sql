/*
  Warnings:

  - You are about to drop the column `props` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('FixedValues', 'Number', 'Text', 'Decimal');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "props";

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "type" "PropertyType" NOT NULL,
    "shopId" INTEGER,
    "productId" INTEGER,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
