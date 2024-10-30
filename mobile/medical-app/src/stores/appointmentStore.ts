import { create } from 'zustand'
import api from '../lib/axios'
import type { IAppointment } from '../types/appointment'

type FilterOptions = {
  doctorId?: string
  specialty?: string
  date?: Date
  time?: string
}

type AppointmentState = {
  appointments: IAppointment[]
  findUpcomingAppointments: (patientId: string) => Promise<void>
  findPastAppointments: (patientId: string) => Promise<void>
  findFilteredAppointments: (data: FilterOptions) => Promise<void>
}

export const useAppointmentStore = create<AppointmentState>(set => ({
  appointments: [],

  findUpcomingAppointments: async patientId => {
    try {
      const response = await api.get(
        `/appointment/upcoming/${patientId}`
      )
      set({ appointments: response.data })
    } catch (error) {
      console.error('Failed to fetch upcoming appointments:', error)
    }
  },

  findPastAppointments: async patientId => {
    try {
      const response = await api.get(
        `/appointment/past/${patientId}`
      )
      set({ appointments: response.data })
    } catch (error) {
      console.error('Failed to fetch past appointments:', error)
    }
  },

  findFilteredAppointments: async data => {
    try {
      const response = await api.get('/appointment/filter', {
        params: {
          doctorId: data.doctorId,
          specialty: data.specialty,
          date: data.date,
          time: data.time,
        },
      });
      set({ appointments: response.data })
    } catch (error) {
      console.error('Failed to fetch past appointments:', error)
    }
  },
}))
