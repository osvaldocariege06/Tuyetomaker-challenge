import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

import type {
  ICreateDoctor,
  IDoctorRepositories,
  IUpdateDoctor,
} from '../models/doctor'
import type { Doctor as IDoctor } from '@prisma/client'

export class DoctorRepository implements IDoctorRepositories {
  async findAll(): Promise<IDoctor[] | null> {
    return await prisma.doctor.findMany({
      include: { specialties: true, availableTimes: true },
    })
  }

  async findById(doctorId: string): Promise<IDoctor | null> {
    return await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        specialties: { include: { specialty: true } },
        availableTimes: true,
      },
    })
  }

  async findByEmail(email: string): Promise<IDoctor | null> {
    console.log('email: ', email)
    return await prisma.doctor.findUnique({
      where: { email },
      include: { specialties: true, availableTimes: true },
    })
  }

  async findBySpecialty(specialtyId: string): Promise<IDoctor[] | null> {
    return await prisma.doctor.findMany({
      where: { specialties: { some: { specialtyId } } },
      include: { specialties: true },
    })
  }

  async findAvailableTimes(doctorId: string) {
    return await prisma.availableTime.findMany({
      where: { doctorId },
    })
  }

  async register(data: ICreateDoctor): Promise<IDoctor | null> {
    const {
      specialties,
      availableTimes,
      name,
      email,
      password,
      permissions,
      role,
    } = data

    return prisma.doctor.create({
      data: {
        name,
        email,
        password,
        permissions,
        role,
        specialties: {
          create: specialties.map((specialtyName: string) => ({
            specialty: {
              connectOrCreate: {
                where: { name: specialtyName },
                create: { name: specialtyName },
              },
            },
          })),
        },
        availableTimes: {
          create: availableTimes,
        },
      },
      include: {
        specialties: { include: { specialty: true } },
        availableTimes: true,
      },
    })
  }

  async login(email: string, password: string) {
    const doctor = await prisma.doctor.findUnique({ where: { email } })
    if (!doctor) return null

    const isPasswordValid = await bcrypt.compare(password, doctor.password)
    return isPasswordValid ? doctor : null
  }

  async update(doctorId: string, data: IUpdateDoctor): Promise<IDoctor | null> {
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    )

    return prisma.doctor.update({
      where: { id: doctorId },
      data: updateData,
      include: {
        specialties: { include: { specialty: true } },
        availableTimes: true,
      },
    })
  }

  async delete(doctorId: string) {
    await prisma.doctorSpecialty.deleteMany({
      where: { doctorId },
    })

    await prisma.availableTime.deleteMany({
      where: { doctorId },
    })

    const deletedDoctor = await prisma.doctor.delete({
      where: { id: doctorId },
    })
    return deletedDoctor
  }
}
