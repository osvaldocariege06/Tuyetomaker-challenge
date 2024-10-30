/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "dateTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "specialty" TEXT,
ADD COLUMN     "time" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
