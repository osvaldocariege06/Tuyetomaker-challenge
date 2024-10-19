/*
  Warnings:

  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `patients` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patientId_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ALTER COLUMN "doctorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "appointments_id_seq";

-- AlterTable
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "doctors_id_seq";

-- AlterTable
ALTER TABLE "patients" DROP CONSTRAINT "patients_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "patients_id_seq";

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
