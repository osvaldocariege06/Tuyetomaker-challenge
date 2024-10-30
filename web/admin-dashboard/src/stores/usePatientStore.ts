"use client";

import { create } from "zustand";
import Cookies from 'js-cookie';
import api from "@/lib/axios";
import type { IPatient } from "@/types/patient";
import type { IAppointment } from "@/types/appointment";



type ICreate = Omit<IPatient, 'id'>


type useStoreState = {
  appointment: IPatient | null;
  token: string | null;
  isAuthenticated: boolean;
  findAll: () => Promise<IPatient[] | undefined>;
  findById: (id: string) => Promise<IPatient | undefined>;
  findAppointmentsByPatientId: (patientId: string) => Promise<IAppointment[] | undefined>;
  delete: (patientId: string) => Promise<void>;
  create: (data: ICreate) => Promise<IPatient | undefined>;
};

export const usePatientStore = create<useStoreState>(() => ({
  appointment: null,
  token: null,
  isAuthenticated: false,

  findAll: async (): Promise<IPatient[] | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get<IPatient[]>("/patient/all")
        return response.data

      } catch (error) {
        console.error("Failed to load all patient:", error);
        return undefined
      }
    }
  },

  findById: async (patientId: string): Promise<IPatient | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get(`/patient/${patientId}`)
        return response.data

      } catch (error) {
        console.error("Failed to get patient id:", error);
        return undefined
      }
    }
  },

  findAppointmentsByPatientId: async (patientId: string): Promise<IAppointment[] | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get(`/patient/${patientId}/appointments`)
        return response.data

      } catch (error) {
        console.error("Failed to get patient id:", error);
        return undefined
      }
    }
  },

  delete: async (patientId: string): Promise<void> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.delete(`/patient/${patientId}`)
        return response.data

      } catch (error) {
        console.error("Failed to cancel patient:", error);
        return undefined
      }
    }
  },

  create: async (data: ICreate): Promise<IPatient | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.post('/patient/create', {
          data
        })
        return response.data

      } catch (error) {
        console.error("Failed to create patient:", error);
        return undefined
      }
    }
  },

}));
