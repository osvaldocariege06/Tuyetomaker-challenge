/*
  Warnings:

  - Made the column `specialty` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "specialty" SET NOT NULL,
ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
