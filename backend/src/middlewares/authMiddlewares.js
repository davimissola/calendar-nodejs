import { verificarJwt } from "../modules/auth/service.js"
import auth from "../modules/auth/models.js"




export async function authMiddlewares(req, res, next) {
        try {
            const token = req.get("Authorization")

            if (!token) {
                return res.status(401).json({message: "Rota protegida."})
            }
            const payload = await verificarJwt(token)

            const user = await auth.userMe(Number(payload.id))

            if (!user) {
                return res.status(404).json({message: "Token inválido."})
            }

            req.user = user

            return next()
        } catch(error) {
            return res.status(404).json({message: "Token inválido."})
        }
}
