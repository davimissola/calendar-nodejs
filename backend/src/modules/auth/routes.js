import express from 'express'
import authController from './controller.js'
import { authMiddlewares } from '../../middlewares/authMiddlewares.js'



const router = express.Router()



router.post('/criar-conta', authController.criarConta)
router.post('/login', authController.login)
router.get('/me', authMiddlewares, authController.userMe)



export default router