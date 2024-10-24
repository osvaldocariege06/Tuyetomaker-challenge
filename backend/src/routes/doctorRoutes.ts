import { Router } from 'express'
import { authenticateToken } from '../middleware/authMiddleware'
import { DoctorController } from '../controllers/doctorController'
import { authorizeRoles } from '../middleware/roleMiddleware'

const router = Router()
const doctorController = new DoctorController()

router.get('/all', authenticateToken, doctorController.getAllDoctors)
router.get('/:doctorId', authenticateToken, doctorController.getDoctorById)

router.get(
  '/specialties/:specialtyId',
  authenticateToken,
  doctorController.getDoctorsBySpecialty
)
router.get(
  '/:doctorId/available-times',
  authenticateToken,
  doctorController.getAvailableTimes
)

router.post('/create', authenticateToken, doctorController.register)
router.put('/:doctorId', authenticateToken, doctorController.update)
router.delete('/:doctorId', authenticateToken, doctorController.delete)

router.post('/login', doctorController.loginDoctor)

export default router
