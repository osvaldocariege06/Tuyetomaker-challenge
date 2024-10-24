import { env } from '../types/env'
import jwt from 'jsonwebtoken'

function generateTestToken() {
  const payload = {
    id: 'b1411951-e2cf-4c9b-84e1-c1eb44e0d932',
    name: 'Edvaldo Cariege',
    email: 'ed.cariege@example.com',
  }

  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '5d' })

  console.log('Generated JWT Token:', token)
  return token
}

// Gerando um token para um médico como teste
generateTestToken()
