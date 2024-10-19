import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PatientRepository } from '../repositories/patientRepository'
import type { ICreatePatient } from '../models/patient'
import { env } from '../types/env'

const patientRepository = new PatientRepository()

export class PatientServices {
  async register({
    name,
    email,
    phone,
    photo,
    birthDate,
    password,
  }: ICreatePatient) {
    const existingPatient = await patientRepository.findPatientByEmail(email)
    if (existingPatient) throw new Error('Email already registered')

    return patientRepository.register({
      name,
      email,
      phone,
      photo,
      birthDate,
      password,
    })
  }

  async login(email: string, password: string) {
    const patient = await patientRepository.findPatientByEmail(email)
    if (!patient || !(await bcrypt.compare(password, patient.password))) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign({ id: patient.id }, env.JWT_SECRET)

    return { token }
  }
}
