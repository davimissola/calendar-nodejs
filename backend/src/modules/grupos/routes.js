import express from 'express'
import gruposController from './controller.js'
import { authMiddlewares } from '../../middlewares/authMiddlewares.js'


const router = express.Router()


router.get('/', gruposController.listarGrupos)
router.get('/me', authMiddlewares, gruposController.listarGruposUser)
router.post('/', authMiddlewares, gruposController.addGrupo)
router.delete('/:id', authMiddlewares, gruposController.deleteGrupo)



export default router