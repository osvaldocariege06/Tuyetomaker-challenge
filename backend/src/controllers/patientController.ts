import type { Request, Response } from 'express'
import { PatientServices } from '../services/patientService'

const patientService = new PatientServices()

export class PatientController {
  async create(req: Request, res: Response) {
    try {
      const result = await patientService.register(req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const result = await patientService.login(email, password)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
