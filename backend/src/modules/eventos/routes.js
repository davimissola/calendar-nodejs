import eventosController from "./controller.js";
import express from 'express'



const router = express.Router()


router.get('/', eventosController.listarEventos)
router.get('/:id_evento', eventosController.getEvento)
router.post('/adicionar', eventosController.adicionarEvento)
router.put('/editar/:id', eventosController.editarEvento)
router.delete('/remover/:id_evento', eventosController.removerEvento)


export default router