/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "doctors"("email");
