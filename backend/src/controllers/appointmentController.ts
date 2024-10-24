import type { Request, Response } from 'express'
import { AppointmentRepository } from '../repositories/appointmentRepository'

const appointmentRepository = new AppointmentRepository()

export class AppointmentController {
  async findAll(_: Request, res: Response) {
    try {
      const appointments = await appointmentRepository.findAll()
      res.status(200).json(appointments)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findById(req: Request, res: Response): Promise<any> {
    try {
      const appointment = await appointmentRepository.findById(
        req.params.appointmentId
      )
      if (!appointment)
        return res.status(404).json({ message: 'Appointment not found.' })
      res.status(200).json(appointment)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async findByDoctor(req: Request, res: Response) {
    try {
      const appointment = await appointmentRepository.findByDoctor(
        req.params.doctorId
      )
      if (!appointment)
        return res.status(404).json({ message: 'Doctor not found.' })
      res.status(200).json(appointment)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async findFutureAppointments(req: Request, res: Response) {
    try {
      const appointments = await appointmentRepository.findFutureAppointments()
      res.status(200).json(appointments)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  async findPastAppointments(req: Request, res: Response) {
    try {
      const appointments = await appointmentRepository.findPastAppointments()
      res.status(200).json(appointments)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  async createAppointment(req: Request, res: Response) {
    const { patientId, doctorId, dateTime, status } = req.body
    try {
      const appointment = await appointmentRepository.create({
        patientId,
        doctorId,
        dateTime: new Date(dateTime),
        status,
      })
      res.status(201).json(appointment)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async confirm(req: Request, res: Response) {
    try {
      const appointment = await appointmentRepository.confirmAppointment(
        req.params.appointmentId
      )
      res.status(200).json(appointment)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const appointment = await appointmentRepository.cancelAppointment(
        req.params.appointmentId
      )
      res.status(200).json(appointment)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }

  async reschedule(req: Request, res: Response) {
    try {
      const { dateTime } = req.body
      const appointment = await appointmentRepository.rescheduleAppointment(
        req.params.appointmentId,
        new Date(dateTime)
      )
      res.status(200).json(appointment)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }
}
