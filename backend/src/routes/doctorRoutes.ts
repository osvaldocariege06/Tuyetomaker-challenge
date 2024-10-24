// import { Router } from 'express'
// import { DoctorController } from '../controllers/doctorController'

// const router = Router()
// const controller = new DoctorController()

// router.post('/auth', controller.register)
// router.post('/auth/login', controller.login)
// router.get('/all', controller.findAllDoctor)
// router.get('/:id', controller.findDoctorById)
// router.put('/:id', controller.update)
// router.delete('/:id', controller.delete)

// export default router

import { Router } from 'express'
import { authenticateToken } from '../middleware/authMiddleware' // Middleware de autenticação JWT
import { DoctorController } from '../controllers/doctorController'
import { authorizeRoles } from '../middleware/roleMiddleware'

const router = Router()
const doctorController = new DoctorController()

// Listar todos os médicos e buscar por ID
router.get('/all', authenticateToken, doctorController.getAllDoctors)
router.get('/:doctorId', authenticateToken, doctorController.getDoctorById)

// Listar médicos por especialidade e horários disponíveis
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

// CRUD de médicos
router.post('/create', authenticateToken, doctorController.register)
router.put('/:doctorId', authenticateToken, doctorController.update)
router.delete('/:doctorId', authenticateToken, doctorController.delete)

// Rota de Login
router.post('/login', doctorController.loginDoctor)

export default router
