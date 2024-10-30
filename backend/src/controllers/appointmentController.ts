import type { Request, Response } from 'express'
import { AppointmentRepository } from '../repositories/appointmentRepository'
import type { Appointment as IAppointment } from '@prisma/client'

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

  async findById(req: Request, res: Response) {
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
    const { patientId, doctorId, specialty, date, time, status } = req.body
    console.log({
      patientId,
      doctorId,
      specialty,
      date,
      time,
      status,
    })

    try {
      const appointment = await appointmentRepository.create({
        patientId,
        doctorId,
        specialty,
        date: new Date(date),
        time,
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
      const { newDate, newTime } = req.body
      const appointment = await appointmentRepository.rescheduleAppointment(
        req.params.appointmentId,
        newDate,
        newTime
      )
      res.status(200).json(appointment)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }

  async findUpcomingAppointmentsByPatientId(req: Request, res: Response) {
    const { patientId } = req.params
    try {
      const appointments =
        await appointmentRepository.findUpcomingAppointmentsByPatientId(
          patientId
        )
      res.status(200).json(appointments)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar agendamentos futuros', error })
    }
  }

  async findPastAppointmentsByPatientId(req: Request, res: Response) {
    const { patientId } = req.params
    try {
      const appointments =
        await appointmentRepository.findPastAppointmentsByPatientId(patientId)
      res.status(200).json(appointments)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar agendamentos passados', error })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async filterAppointments(req: Request, res: Response): Promise<any> {
    try {
      const { doctorId, specialty, date, time } = req.query

      console.log({ doctorId, specialty, date, time })

      const appointments = await appointmentRepository.findByFilters({
        doctorId: doctorId as string,
        specialty: specialty as string,
        date: date ? new Date(date as string) : undefined,
        time: time as string,
      })

      return res.status(200).json(appointments)
    } catch (error) {
      console.error('Erro ao filtrar agendamentos:', error)
      return res.status(500).json({ message: 'Erro ao filtrar agendamentos' })
    }
  }
}
