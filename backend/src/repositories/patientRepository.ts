import bcrypt from 'bcryptjs'
import type { Patient } from '@prisma/client'
import { prisma } from '../lib/prisma'
import type {
  ICreatePatient,
  IUpdatePatient,
  IPatientRepository,
} from '../models/patient'

export class PatientRepository implements IPatientRepository {
  async findAll() {
    return await prisma.patient.findMany()
  }

  async findById(patientId: string) {
    return await prisma.patient.findUnique({
      where: { id: patientId },
    })
  }

  async findByEmail(email: string) {
    return await prisma.patient.findUnique({
      where: { email },
    })
  }

  async findAppointmentsByPatientId(patientId: string) {
    return await prisma.appointment.findMany({
      where: { patientId },
      include: { doctor: true },
      orderBy: { dateTime: 'asc' },
    })
  }

  async create(data: ICreatePatient) {
    return await prisma.patient.create({ data })
  }

  async login(data: Omit<Patient, 'id' | 'name' | 'phone' | 'birthDate'>) {
    const patient = await prisma.patient.findUnique({
      where: { email: data.email },
    })
    if (!patient) return null

    const isPasswordValid = await bcrypt.compare(
      data.password,
      patient.password
    )
    return isPasswordValid ? patient : null
  }

  async update(patientId: string, data: IUpdatePatient) {
    return await prisma.patient.update({
      where: { id: patientId },
      data,
    })
  }

  async delete(patientId: string) {
    return await prisma.patient.delete({ where: { id: patientId } })
  }
}
