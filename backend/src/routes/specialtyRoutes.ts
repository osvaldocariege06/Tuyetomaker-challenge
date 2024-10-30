import express, { Router } from 'express'

import { SpecialtyController } from '../controllers/specialtyController'
import { authenticateToken } from '../middleware/authMiddleware'

const router = Router()
const app = express()
const specialtyController = new SpecialtyController()

app.use(express.json())

router.get('/all', authenticateToken, specialtyController.findAll)

export default router
