import { prisma } from '../lib/prisma'
import type {
  IAppointmentRepositories,
  ICreateAppointment,
} from '../models/appointment'
import type { Appointment as IAppointment } from '@prisma/client'

export class AppointmentRepository implements IAppointmentRepositories {
  async findAll() {
    return await prisma.appointment.findMany({
      include: { doctor: true, patient: true },
      orderBy: { dateTime: 'asc' },
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
      orderBy: { dateTime: 'asc' },
    })
  }

  async findFutureAppointments() {
    const now = new Date()
    return prisma.appointment.findMany({
      where: {
        dateTime: { gt: now },
        // status: 'CONFIRMED',
      },
      include: { patient: true, doctor: true },
    })
  }

  async findPastAppointments() {
    const now = new Date()
    return prisma.appointment.findMany({
      where: {
        dateTime: { lte: now },
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

  async rescheduleAppointment(appointmentId: string, newDateTime: Date) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'RESCHEDULED',
        dateTime: newDateTime,
        rescheduledAt: new Date(),
      },
    })
  }
}
