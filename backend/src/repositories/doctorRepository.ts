import type { Doctor } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '../lib/prisma'
import type { DoctorRepositories, DoctorRequest } from '../models/doctor'

export class DoctorRepository implements DoctorRepositories {
  async findDoctorByEmail(email: string): Promise<Doctor | null> {
    return prisma.doctor.findUnique({ where: { email } })
  }

  async findDoctorById(id: string): Promise<Doctor | null> {
    return prisma.doctor.findFirst({ where: { id } })
  }

  async findAllDoctor(): Promise<Doctor[] | null> {
    return prisma.doctor.findMany()
  }

  async register(data: DoctorRequest): Promise<Doctor | null> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    return await prisma.doctor.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        photo: data.photo,
        specialty: data.specialty,
      },
    })
  }

  async update(id: string, data: DoctorRequest): Promise<Doctor | null> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    return await prisma.doctor.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        photo: data.photo,
        specialty: data.specialty,
      },
    })
  }

  async delete(id: string) {
    return await prisma.doctor.delete({
      where: {
        id,
      },
    })
  }
}
