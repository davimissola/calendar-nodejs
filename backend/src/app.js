import express from 'express'
import authRouter from './modules/auth/routes.js'
import eventoRouter from './modules/eventos/routes.js'
import gruposRouter from './modules/grupos/routes.js'
import { authMiddlewares } from "./middlewares/authMiddlewares.js";
import cors from 'cors'




const app = express()
app.use(express.json())
app.use(cors())
app.use('', authRouter)
app.use('/eventos', authMiddlewares, eventoRouter)
app.use('/grupos', gruposRouter)




app.listen(3000, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:3000`))