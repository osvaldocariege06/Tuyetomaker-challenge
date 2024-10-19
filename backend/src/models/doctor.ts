import type { Doctor } from '@prisma/client'

export type DoctorRequest = Omit<
  Doctor,
  'id' | 'availableTimes' | 'appointments' | 'createdAt' | 'updatedAt'
>
export type DoctorUpdateRequest = Omit<
  Doctor,
  'appointments' | 'createdAt' | 'updatedAt'
>

export interface DoctorRepositories {
  register: (data: DoctorRequest) => Promise<Doctor | null>
  findDoctorByEmail: (email: string) => Promise<Doctor | null>
  findDoctorById: (id: string) => Promise<Doctor | null>
  findAllDoctor: () => Promise<Doctor[] | null>
  update: (id: string, data: DoctorUpdateRequest) => Promise<Doctor | null>
  delete: (id: string) => void
}
