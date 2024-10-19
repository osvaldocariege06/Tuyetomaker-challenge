import type { Request, Response } from 'express'
import { DoctorServices } from '../services/doctorService'

const doctorService = new DoctorServices()

export class DoctorController {
  async register(req: Request, res: Response) {
    try {
      const result = await doctorService.register(req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const result = await doctorService.login(email, password)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async findDoctorById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await doctorService.findDoctorById(id)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async findAllDoctor(_: Request, res: Response) {
    try {
      const result = await doctorService.findAllDoctor()
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await doctorService.update(id, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await doctorService.delete(id)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
