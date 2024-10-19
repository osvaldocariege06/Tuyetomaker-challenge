export interface Appointment {
  id?: string
  patientId: string
  doctorId: string
  dateTime: Date
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED'
}
