import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { DoctorRequest, DoctorUpdateRequest } from '../models/doctor'
import { env } from '../types/env'
import { DoctorRepository } from '../repositories/doctorRepository'

const doctorRepository = new DoctorRepository()

export class DoctorServices {
  async register({ name, email, photo, specialty, password }: DoctorRequest) {
    const existingDoctor = await doctorRepository.findDoctorByEmail(email)
    if (existingDoctor) throw new Error('Email already registered')

    return doctorRepository.register({
      name,
      email,
      photo,
      specialty,
      password,
    })
  }

  async login(email: string, password: string) {
    const doctor = await doctorRepository.findDoctorByEmail(email)
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign({ id: doctor.id }, env.JWT_SECRET)

    return { token }
  }

  async findDoctorById(id: string) {
    const result = await doctorRepository.findDoctorById(id)
    return result
  }

  async findAllDoctor() {
    const result = await doctorRepository.findAllDoctor()
    return result
  }

  async update(id: string, data: DoctorRequest) {
    const existingDoctor = await doctorRepository.findDoctorById(id)
    if (!existingDoctor) throw new Error('Doctor not found!')

    return doctorRepository.update(id, data)
  }

  async delete(id: string) {
    const result = await doctorRepository.delete(id)
    return result
  }
}
