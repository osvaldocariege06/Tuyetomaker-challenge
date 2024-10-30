import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import type {
  IAppointmentRepositories,
  ICreateAppointment,
} from '../models/appointment'
import type { Appointment as IAppointment } from '@prisma/client'

type FilterOptions = {
  doctorId?: string
  specialty?: string
  date?: Date
  time?: string
}

export class AppointmentRepository implements IAppointmentRepositories {
  async findAll() {
    return await prisma.appointment.findMany({
      include: { doctor: true, patient: true },
      orderBy: { date: 'asc' },
    })
  }

  async findById(appointmentId: string): Promise<IAppointment | null> {
    return await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, patient: true },
    })
  }

  async findByDoctor(doctorId: string) {
    return await prisma.appointment.findMany({
      where: { doctorId },
      include: { patient: true },
      orderBy: { date: 'asc' },
    })
  }

  async findFutureAppointments() {
    const now = new Date()
    return prisma.appointment.findMany({
      where: {
        date: { gt: now },
        // status: 'CONFIRMED',
      },
      include: { patient: true, doctor: true },
    })
  }

  async findPastAppointments() {
    const now = new Date()
    return prisma.appointment.findMany({
      where: {
        date: { lte: now },
        status: 'CONFIRMED',
      },
      include: { patient: true, doctor: true },
    })
  }

  async create(data: ICreateAppointment) {
    return await prisma.appointment.create({ data })
  }

  async confirmAppointment(appointmentId: string) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CONFIRMED' },
    })
  }

  async cancelAppointment(appointmentId: string) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELED' },
    })
  }

  async rescheduleAppointment(
    appointmentId: string,
    newDate: Date,
    newTime: string
  ) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'RESCHEDULED',
        date: newDate,
        time: newTime,
        rescheduledAt: new Date(),
      },
    })
  }

  async findUpcomingAppointmentsByPatientId(patientId: string) {
    return await prisma.appointment.findMany({
      where: {
        patientId,
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
    })
  }

  async findPastAppointmentsByPatientId(patientId: string) {
    return await prisma.appointment.findMany({
      where: {
        patientId,
        date: { lt: new Date() },
      },
      orderBy: { date: 'desc' },
    })
  }

  async findByFilters({
    doctorId,
    specialty,
    date,
    time,
  }: FilterOptions): Promise<IAppointment[]> {
    return prisma.appointment.findMany({
      where: {
        ...(doctorId && { doctorId }), // Filtra pelo ID do médico, se presente
        ...(specialty && { specialty }), // Filtra pela especialidade, se presente
        ...(time && { time }), // Filtra pela especialidade, se presente
        ...(date && { date }),
      },
      include: {
        doctor: true,
        patient: true,
      },
    })
  }
}
