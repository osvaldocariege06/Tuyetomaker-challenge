import type { IDoctor } from "./doctor";
import type { IPatient } from "./patient";

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  RESCHEDULED = 'RESCHEDULED',
}

export type IAppointment = {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  specialty: string;
  status: AppointmentStatus
  rescheduledAt: Date,
};