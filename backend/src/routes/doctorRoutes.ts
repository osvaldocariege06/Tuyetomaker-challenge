import { Router } from 'express'
import { DoctorController } from '../controllers/doctorController'

const router = Router()
const controller = new DoctorController()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/all', controller.findAllDoctor)
router.get('/:id', controller.findDoctorById)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router
