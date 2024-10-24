import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import type { Request, Response } from 'express'
import { DoctorRepository } from '../repositories/doctorRepository'
import { env } from '../types/env'

const doctorRepository = new DoctorRepository()

const defaultPermissions = {
  DOCTOR: ['appointment:read', 'appointment:write'],
  ADMIN: [
    'appointment:read',
    'appointment:write',
    'report:read',
    'report:write',
  ],
}

export class DoctorController {
  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await doctorRepository.findAll()
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getDoctorById(req: Request, res: Response): Promise<any> {
    try {
      const doctor = await doctorRepository.findById(req.params.doctorId)
      if (!doctor) return res.status(404).json({ message: 'Doctor not found.' })
      res.status(200).json(doctor)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getDoctorsBySpecialty(req: Request, res: Response) {
    try {
      const doctors = await doctorRepository.findBySpecialty(
        req.params.specialtyId
      )
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getAvailableTimes(req: Request, res: Response) {
    try {
      const times = await doctorRepository.findAvailableTimes(
        req.params.doctorId
      )
      res.status(200).json(times)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async register(req: Request, res: Response): Promise<any> {
    try {
      const { data } = req.body

      const existingUser = await doctorRepository.findByEmail(data.email)
      if (existingUser) throw new Error('Email already registered')

      if (!data.password) {
        return res.status(400).json({ message: 'Password is required' })
      }

      const hashedPassword = await bcrypt.hash(data.password, 10)
      const permissions = defaultPermissions[data.role]
      const doctor = await doctorRepository.register({
        ...data,
        permissions,
        password: hashedPassword,
      })

      res.status(201).json(doctor)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { password, ...data } = req.body

      const { role } = req.body

      const hashedPassword = await bcrypt.hash(password, 10)
      const permissions = defaultPermissions[role]
      const result = await doctorRepository.update(req.params.doctorId, {
        ...data,
        role,
        permissions,
        password: hashedPassword,
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await doctorRepository.delete(req.params.doctorId)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async loginDoctor(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body

    try {
      const doctor = await doctorRepository.login(email, password)
      if (!doctor) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const payload = {
        id: doctor.id,
        name: doctor.name,
        role: 'doctor',
        permissions: doctor.permissions,
      }

      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '5d' })
      res.json({
        token,
        doctor: {
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          permissions: doctor.permissions,
        },
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
