import express, { Router } from 'express'

import { PatientController } from '../controllers/patientController'
import { authenticateToken } from '../middleware/authMiddleware' // Middleware de autenticação JWT

const router = Router()
const app = express()
const patientController = new PatientController()

app.use(express.json())

// CRUD de Pacientes
router.get('/', authenticateToken, patientController.findAll)
router.get('/:patientId', authenticateToken, patientController.findById)
router.get(
  '/:patientId/appointments',
  authenticateToken,
  patientController.findAppointmentsByPatientId
)
router.post('/', patientController.create)
router.post('/login', patientController.login)
router.put('/:patientId', authenticateToken, patientController.update)
router.delete('/:patientId', authenticateToken, patientController.delete)

export default router
