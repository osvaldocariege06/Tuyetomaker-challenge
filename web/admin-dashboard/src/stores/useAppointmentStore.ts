"use client";

import { create } from "zustand";
import Cookies from 'js-cookie';
import api from "@/lib/axios";
import type { IAvailableTimesItems } from "@/components/modals/availableTimesListModal";
import type { IAppointment } from "@/types/appointment";



type ICreate = Omit<IAppointment, 'id' | 'specialties' | 'availableTimes'> & {
  specialties: string[]
  availableTimes: IAvailableTimesItems[]
}


type useStoreState = {
  appointment: IAppointment | null;
  token: string | null;
  isAuthenticated: boolean;
  getAll: () => Promise<IAppointment[] | undefined>;
  findFutureAppointments: () => Promise<IAppointment[] | undefined>;
  findPastAppointments: () => Promise<IAppointment[] | undefined>;
  getById: (id: string) => Promise<IAppointment | undefined>;
  confirmAppointment: (appointmentId: string) => Promise<void>;
  rescheduleAppointment: (appointmentId: string, dateTime: Date) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  create: (data: ICreate) => Promise<IAppointment | undefined>;
};

export const useAppointmentStore = create<useStoreState>(() => ({
  appointment: null,
  token: null,
  isAuthenticated: false,

  getAll: async (): Promise<IAppointment[] | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get<IAppointment[]>("/appointment")
        return response.data

      } catch (error) {
        console.error("Failed to load all doctors:", error);
        return undefined
      }
    }
  },

  findFutureAppointments: async (): Promise<IAppointment[] | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get<IAppointment[]>("/appointment/future")
        return response.data

      } catch (error) {
        console.error("Failed to load all appointments future:", error);
        return undefined
      }
    }
  },

  findPastAppointments: async (): Promise<IAppointment[] | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get<IAppointment[]>("/appointment/past")
        return response.data

      } catch (error) {
        console.error("Failed to load all appointments past:", error);
        return undefined
      }
    }
  },

  getById: async (id: string): Promise<IAppointment | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get(`/appointment/${id}`)
        return response.data

      } catch (error) {
        console.error("Failed to get doctor id:", error);
        return undefined
      }
    }
  },

  confirmAppointment: async (appointmentId: string): Promise<void> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.patch(`/appointment/${appointmentId}/confirm`)
        return response.data

      } catch (error) {
        console.error("Failed to confirm appointment:", error);
        return undefined
      }
    }
  },

  rescheduleAppointment: async (appointmentId: string, dateTime: Date): Promise<void> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.patch(`/appointment/${appointmentId}/reschedule`, { dateTime })
        return response.data

      } catch (error) {
        console.error("Failed to reschedule appointment:", error);
        return undefined
      }
    }
  },

  cancelAppointment: async (appointmentId: string): Promise<void> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.patch(`/appointment/${appointmentId}/cancel`)
        return response.data

      } catch (error) {
        console.error("Failed to cancel appointment:", error);
        return undefined
      }
    }
  },

  create: async (data: ICreate): Promise<IAppointment | undefined> => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response = await api.post('/appointment/create', {
          data
        })
        return response.data

      } catch (error) {
        console.error("Failed to create appointment:", error);
        return undefined
      }
    }
  },

}));
