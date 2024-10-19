import { Router } from 'express'
import { PatientController } from '../controllers/patientController'

const router = Router()
const controller = new PatientController()

router.post('/register', controller.create)
router.post('/login', controller.login)

export default router
