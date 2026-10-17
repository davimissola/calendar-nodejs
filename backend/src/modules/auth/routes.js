import express from 'express'
import authController from './controller.js'



const router = express.Router()



router.post('/criar-conta', authController.criarConta)
router.post('/login', authController.login)
router.get('/me', authController.userMe)



export default router