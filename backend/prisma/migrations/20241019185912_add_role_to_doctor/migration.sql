/*
  Warnings:

  - The `status` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `availableTimes` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `doctors` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'RESCHEDULED');

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "rescheduledAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "availableTimes",
DROP COLUMN "specialty",
ADD COLUMN     "permissions" TEXT[],
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DOCTOR';

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "specialities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "specialities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availableTimes" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "availableTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_specialties" (
    "doctorId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,

    CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("doctorId","specialtyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialities_name_key" ON "specialities"("name");

-- AddForeignKey
ALTER TABLE "availableTimes" ADD CONSTRAINT "availableTimes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
