import type { Request, Response } from 'express'

import { SpecialtyRepository } from '../repositories/specialtyRepository'

const specialtyRepository = new SpecialtyRepository()

export class SpecialtyController {
  async findAll(req: Request, res: Response) {
    try {
      const specialty = await specialtyRepository.findAll()
      res.status(200).json(specialty)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
