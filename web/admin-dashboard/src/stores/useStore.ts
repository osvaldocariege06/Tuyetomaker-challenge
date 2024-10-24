'use client'

import { create as createStore } from 'zustand'
import Cookies from 'js-cookie'
import api from '@/lib/axios'
import type { IAvailableTimesItems } from '@/components/modals/availableTimesListModal'
import type { RoleState } from '@/types/doctor'

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

type ICreate = Omit<User, 'id' | 'permissions'>

type useStoreState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  findAll: () => Promise<User[] | undefined>
  findById: (id: string) => Promise<User | undefined>
  create: (data: ICreate) => Promise<User | undefined>
  update: (doctorId: string, data: ICreate) => Promise<User | undefined>
  remove: (id: string) => Promise<void>
}

export const useStore = createStore<useStoreState>(() => ({
  user: null,
  token: null,
  isAuthenticated: false,

  findAll: async (): Promise<User[] | undefined> => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      try {
        const response = await api.get<User[]>('/doctor/all')
        const result = response.data.filter(doctor => doctor.role !== 'ADMIN')
        return result
      } catch (error) {
        console.error('Failed to load all doctors:', error)
        return undefined
      }
    }
  },

  remove: async (id: string): Promise<void> => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      try {
        const response = await api.delete(`/doctor/${id}`)
        return response.data
      } catch (error) {
        console.error('Failed to delete doctor:', error)
        return undefined
      }
    }
  },

  findById: async (id: string): Promise<User | undefined> => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      try {
        const response = await api.get(`/doctor/${id}`)
        return response.data
      } catch (error) {
        console.error('Failed to get doctor id:', error)
        return undefined
      }
    }
  },

  create: async ({
    name,
    email,
    role,
    password,
    availableTimes,
    specialties,
  }: ICreate): Promise<User | undefined> => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      try {
        const response = await api.post('/doctor/create', {
          name,
          email,
          role,
          password,
          availableTimes,
          specialties,
        })
        return response.data
      } catch (error) {
        console.error('Failed to create doctor:', error)
        return undefined
      }
    }
  },

  update: async (
    doctorId: string,
    { name, email, role, password }: ICreate
  ): Promise<User | undefined> => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      try {
        const response = await api.put(`/doctor/${doctorId}`, {
          name,
          email,
          role,
          password,
        })
        return response.data
      } catch (error) {
        console.error('Failed to update doctor:', error)
        return undefined
      }
    }
  },
}))
