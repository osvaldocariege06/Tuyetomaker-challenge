import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/axios';
import { jwtDecode } from 'jwt-decode'

import type { IPatient } from '../types/patient';
import { Alert } from 'react-native';



type AuthState = {
  user: IPatient | null;
  token: string | null;
  patients: IPatient[] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUserFromToken: () => Promise<void>;
  createPatient: (data: Omit<IPatient, 'id'>) => Promise<void>;
  updatePatient: (id: string, data: Partial<IPatient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  findAllPatients: () => Promise<void>;
  findPatientById: (id: string) => Promise<IPatient | null>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  patients: null,

  login: async (email, password) => {
    try {
      const response = await api.post('/patient/login', { email, password });
      const { token } = response.data;

      await AsyncStorage.setItem('token', token);
      const decodedUser: IPatient = jwtDecode(token);
      set({ user: decodedUser });
    } catch (error) {
      console.error('Login failed:', error);
      alert('Credenciais inválidas');
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ user: null, patients: null });
  },

  loadUserFromToken: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const decodedUser: IPatient = jwtDecode(token);
        set({ user: decodedUser });
      } catch (error) {
        console.log('Erro ao decodificar token:', error);
        await AsyncStorage.removeItem('token');
        set({ user: null });
      }
    }
  },

  createPatient: async (patientData) => {
    try {
      const response = await api.post('/patient/create', patientData);
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);
      set({ user, token });
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Erro ao registrar paciente');
    }
  },

  updatePatient: async (id, data) => {
    try {
      await api.put(`/patient/${id}`, data);
      await useAuthStore.getState().findAllPatients();
    } catch (error) {
      console.error('Erro ao atualizar o paciente:', error);
    }
  },

  deletePatient: async (id) => {
    try {
      await api.delete(`/patient/${id}`);
      await useAuthStore.getState().findAllPatients();
    } catch (error) {
      console.error('Erro ao excluir o paciente:', error);
    }
  },

  findAllPatients: async () => {
    try {
      const response = await api.get('/patient/all');
      set({ patients: response.data });
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  },

  findPatientById: async (id) => {
    try {
      const response = await api.get(`/patient/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      return null;
    }
  },
}));
