import express from 'express'
import authController from './controller.js'



const router = express.Router()



router.post('/criar-conta', authController.criarConta)
router.post('/login', authController.login)



export default router