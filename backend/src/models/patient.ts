import type { Patient, Appointment as IAppointment } from '@prisma/client'

export type ICreatePatient = Omit<
  Patient,
  'id' | 'appointments' | 'createdAt' | 'updatedAt'
>

export type ILoginPatient = Omit<
  Patient,
  | 'id'
  | 'name'
  | 'phone'
  | 'birthDate'
  | 'appointments'
  | 'createdAt'
  | 'updatedAt'
>

export type IUpdatePatient = Omit<
  Patient,
  'id' | 'appointments' | 'createdAt' | 'updatedAt'
>

export interface IPatientRepository {
  create: (data: ICreatePatient) => Promise<Patient | null>
  login: (data: ILoginPatient) => Promise<Patient | null>
  findByEmail: (email: string) => Promise<Patient | null>
  findById: (id: string) => Promise<Patient | null>
  findAll: () => Promise<Patient[] | null>
  findAppointmentsByPatientId: (
    patientId: string
  ) => Promise<IAppointment[] | null>
  update: (id: string, data: IUpdatePatient) => Promise<Patient | null>
  delete: (id: string) => void
}
