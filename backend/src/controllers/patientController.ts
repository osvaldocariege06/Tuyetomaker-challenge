import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PatientRepository } from '../repositories/patientRepository'
import { env } from '../types/env'

const patientRepository = new PatientRepository()

export class PatientController {
  async findAll(req: Request, res: Response) {
    try {
      const patients = await patientRepository.findAll()
      res.status(200).json(patients)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findById(req: Request, res: Response): Promise<any> {
    try {
      const patient = await patientRepository.findById(req.params.patientId)
      if (!patient)
        return res.status(404).json({ message: 'Patient not found.' })
      res.status(200).json(patient)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findAppointmentsByPatientId(req: Request, res: Response): Promise<any> {
    try {
      const appointment = await patientRepository.findAppointmentsByPatientId(
        req.params.patientId
      )
      if (!appointment)
        return res.status(404).json({ message: 'Patient not found.' })
      res.status(200).json(appointment)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, password, phone, birthDate } = req.body
    const existingUser = await patientRepository.findByEmail(email)
    if (existingUser) throw new Error('Email already registered')

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const patient = await patientRepository.create({
        name,
        email,
        password: hashedPassword,
        phone,
        birthDate: new Date(birthDate),
      })

      res.status(201).json(patient)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async login(req: Request, res: Response): Promise<any> {
    try {
      const patient = await patientRepository.login(req.body)
      if (!patient) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const payload = {
        id: patient.id,
        name: patient.name,
      }

      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })

      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async update(req: Request, res: Response) {
    const { name, email, password, phone, birthDate } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const updatedPatient = await patientRepository.update(
        req.params.patientId,
        {
          name,
          email,
          password: hashedPassword,
          phone,
          birthDate: new Date(birthDate),
        }
      )

      res.status(200).json(updatedPatient)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await patientRepository.delete(req.params.patientId)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
