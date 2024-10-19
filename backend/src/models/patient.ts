import type { Patient } from '@prisma/client'

export type ICreatePatient = Omit<
  Patient,
  'id' | 'appointments' | 'createdAt' | 'updatedAt'
>

export interface IPatientRepository {
  register: (data: ICreatePatient) => Promise<Patient | null>
  findPatientByEmail: (email: string) => Promise<Patient | null>
}
