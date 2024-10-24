import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import patientRoutes from './routes/patientRoutes'
import doctorRoutes from './routes/doctorRoutes'
import appointmentRoutes from './routes/appointmentRoutes'

export const app = express()

// Configuração do CORS
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/patient', patientRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/appointment', appointmentRoutes)
