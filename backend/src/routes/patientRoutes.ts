import express, { Router } from 'express'

import { PatientController } from '../controllers/patientController'
import { authenticateToken } from '../middleware/authMiddleware'

const router = Router()
const app = express()
const patientController = new PatientController()

app.use(express.json())

router.get('/all', authenticateToken, patientController.findAll)
router.get('/:patientId', authenticateToken, patientController.findById)
router.get(
  '/:patientId/appointments',
  authenticateToken,
  patientController.findAppointmentsByPatientId
)
router.post('/login', patientController.login)
router.post('/create', patientController.create)
router.put('/:patientId', authenticateToken, patientController.update)
router.delete('/:patientId', authenticateToken, patientController.delete)

export default router
