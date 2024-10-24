import { Router } from 'express'
import { AppointmentController } from '../controllers/appointmentController'
import { authenticateToken } from '../middleware/authMiddleware'
import { authorizePermissions } from '../middleware/permissionMiddleware'

const router = Router()
const appointmentController = new AppointmentController()

router.get('/', authenticateToken, appointmentController.findAll)
router.get(
  '/future',
  authenticateToken,
  appointmentController.findFutureAppointments
)

router.get(
  '/past',
  authenticateToken,
  appointmentController.findPastAppointments
)
router.get('/:appointmentId', authenticateToken, appointmentController.findById)

router.post('/', authenticateToken, appointmentController.createAppointment)

router.patch(
  '/:appointmentId/confirm',
  authenticateToken,
  appointmentController.confirm
)
router.patch(
  '/:appointmentId/cancel',
  authenticateToken,
  appointmentController.cancel
)
router.patch(
  '/:appointmentId/reschedule',
  authenticateToken,
  appointmentController.reschedule
)

export default router
