import express from 'express'
import patientRoutes from './routes/patientRoutes'
import doctorRoutes from './routes/doctorRoutes'

export const app = express()

app.use(express.json())
app.use('/api/auth/patient', patientRoutes)
app.use('/api/auth/doctor', doctorRoutes)
