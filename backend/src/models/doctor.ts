import type { Doctor as IDoctor } from '@prisma/client'

export type ICreateDoctor = Omit<
  IDoctor,
  'id' | 'appointments' | 'createdAt' | 'updatedAt'
> & {
  specialties: string[]
  availableTimes: {
    day: string
    start: string
    end: string
  }[]
}
export type IUpdateDoctor = Omit<
  IDoctor,
  'appointments' | 'createdAt' | 'updatedAt'
> & {
  specialties: string[]
  availableTimes: {
    day: string
    start: string
    end: string
  }[]
}

export interface IDoctorRepositories {
  register: (data: ICreateDoctor) => Promise<IDoctor | null>
  findById: (id: string) => Promise<IDoctor | null>
  findByEmail: (email: string) => Promise<IDoctor | null>
  findBySpecialty: (specialtyId: string) => Promise<IDoctor[] | null>
  findAll: () => Promise<IDoctor[] | null>
  update: (id: string, data: IUpdateDoctor) => Promise<IDoctor | null>
  delete: (id: string) => void
}
