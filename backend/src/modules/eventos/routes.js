import eventosController from "./controller.js";
import express from 'express'



const router = express.Router()


router.get('/', eventosController.listarEventos)
router.get('/:id_evento', eventosController.getEvento)
router.post('/adicionar', eventosController.adicionarEvento)
router.delete('/remover/:id_evento', eventosController.removerEvento)


export default router