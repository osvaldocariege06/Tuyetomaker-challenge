import bcrypt from 'bcryptjs'
import type { Patient } from '@prisma/client'

import type { ICreatePatient, IPatientRepository } from '../models/patient'
import { prisma } from '../lib/prisma'

export class PatientRepository implements IPatientRepository {
  async findPatientByEmail(email: string): Promise<Patient | null> {
    return prisma.patient.findUnique({ where: { email } })
  }

  async register(data: ICreatePatient): Promise<Patient | null> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    return await prisma.patient.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        birthDate: data.birthDate,
        phone: data.phone,
        photo: data.photo,
      },
    })
  }
}
