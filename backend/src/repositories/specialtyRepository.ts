import { prisma } from '../lib/prisma'

export class SpecialtyRepository {
  async findAll() {
    return await prisma.specialty.findMany()
  }
}
