import { authController } from '@/controllers/auth.controller'
import express from 'express'
const router = express.Router()

router.post('/signIn', authController.signIn)

export default router
