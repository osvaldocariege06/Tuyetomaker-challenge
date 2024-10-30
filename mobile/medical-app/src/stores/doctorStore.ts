import { create } from 'zustand'
import api from '../lib/axios'
import type { RoleState, IAvailableTimesItems } from '../types/doctor'

type Specialty = {
  name: string;
  id: string;
}

export enum WeekDayStatus {
  MONDAY = 'SEGUNDA-FEIRA',
  TUESDAY = 'TERÇA-FEIRA',
  WEDNESDAY = 'QUART-FEIRA',
  THURSDAY = 'QUINTA-FEIRA',
  FRIDAY = 'SEXTA-FEIRA',
}

type IAvailableTimes = {

  id: string,
  day: WeekDayStatus,
  start: string,
  end: string,
  doctorId: string

}

type User = {
  id: string
  name: string
  email: string
  password: string
  role: RoleState
  permissions: string[]
  specialties: string[]
  availableTimes: IAvailableTimesItems[]
}

type DoctoState = {
  doctors: User[]
  specialty: Specialty[]
  availableTimes: IAvailableTimes[]
  findAll: () => Promise<User[] | undefined>
  findAllSpecialty: () => Promise<Specialty[] | undefined>
  findAvailableTime: (doctorId: string) => Promise<IAvailableTimes[] | undefined>
}

export const useDoctorStore = create<DoctoState>(set => ({
  doctors: [],
  specialty: [],
  availableTimes: [],

  findAll: async (): Promise<User[] | undefined> => {
    try {
      const response = await api.get<User[]>('/doctor/all')
      const doctors = response.data.filter(doctor => doctor.role !== 'ADMIN')

      set({ doctors: response.data })
      return doctors
    } catch (error) {
      console.error('Failed to load all doctors:', error)
    }
  },

  findAllSpecialty: async (): Promise<Specialty[] | undefined> => {
    try {
      const response = await api.get<Specialty[]>('/specialty/all')
      const specialty = response.data

      set({ specialty: response.data })
      return specialty
    } catch (error) {
      console.error('Failed to load all specialty:', error)
    }
  },

  findAvailableTime: async (doctorId): Promise<IAvailableTimes[] | undefined> => {
    try {
      const response = await api.get<IAvailableTimes[]>(`/doctor/${doctorId}/available-times`)
      const availableTimes = response.data

      set({ availableTimes: response.data })
      return availableTimes
    } catch (error) {
      console.error('Failed to load all availableTimes:', error)
    }
  },


}))
