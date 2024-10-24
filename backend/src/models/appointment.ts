import type { Appointment as IAppointment } from '@prisma/client'

export type ICreateAppointment = Omit<
  IAppointment,
  'id' | 'createdAt' | 'rescheduledAt' | 'updatedAt'
>

export interface IAppointmentRepositories {
  findAll: () => Promise<IAppointment[]>
  findById: (appointmentId: string) => Promise<IAppointment | null>
  findByDoctor: (doctorId: string) => Promise<IAppointment[] | null>
  findFutureAppointments: () => Promise<IAppointment[] | null>
  findPastAppointments: () => Promise<IAppointment[] | null>
  confirmAppointment: (appointmentId: string) => Promise<IAppointment | null>
  cancelAppointment: (appointmentId: string) => Promise<IAppointment | null>
  rescheduleAppointment: (
    appointmentId: string,
    newDateTime: Date
  ) => Promise<IAppointment | null>
  create: (data: ICreateAppointment) => Promise<IAppointment | null>
}
