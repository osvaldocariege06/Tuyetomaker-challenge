'use client'

import { create } from 'zustand'
import Cookies from 'js-cookie'
import api from '@/lib/axios'

type User = {
  id: string
  name: string
  email: string
  permissions: string[]
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean | undefined>
  logout: () => void
  loadUserFromCookies: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email, password): Promise<boolean | undefined> => {
    try {
      const response = await api.post('/doctor/login', { email, password })
      const { token, doctor } = response.data

      Cookies.set('token', token)
      Cookies.set('user', JSON.stringify(doctor))
      api.defaults.headers.Authorization = `Bearer ${token}`

      set({ user: doctor, token, isAuthenticated: true })

      return true
    } catch (error) {
      console.error('Login failed:', error)
      alert('Invalid credentials')
    }
  },

  logout: () => {
    Cookies.remove('token')
    set({ user: null, token: null, isAuthenticated: false })
    return false
  },

  loadUserFromCookies: () => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      const storedUser = Cookies.get('user')
      if (storedUser) {
        set({ user: JSON.parse(storedUser), token, isAuthenticated: true })
      }
    }
  },
}))
