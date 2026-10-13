import express from 'express'
import authRouter from './modules/auth/routes.js'




const app = express()
app.use(express.json())
app.use('', authRouter)




app.listen(3000, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:3000`))