import auth from './models.js'
import { criarHash, compararHash, criarJwt, verificarJwt } from './service.js'


class authController {

    static async criarConta(req, res) {
        try {
            const {ra, username, senha} = req.body
            const hashed_senha = await criarHash(senha)
            const usuario = await auth.criarConta(ra, username, hashed_senha)

            if (usuario < 1) {
                return res.status(400).json({message: 'Nenhum usuário criado.'})
            }

            return res.status(201).json({message: 'Usuário criado.'})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }

    static async login(req, res) {
        try {
            const {username, senha} = req.body
            
            const usuario = await auth.login(username)
            
            if (!usuario) {
                return res.status(404).json({message: 'Nome de usuário incorreto.'})
            }

            const senha_correta = await compararHash(senha, usuario.senha)
            if (!senha_correta) {
                return res.status(404).json({message: 'Senha incorreta.'})
            }

            const token = await criarJwt(usuario.id)

            return res.status(200).json({access_token: token, token_type: "Bearer"});
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }

    static async userMe(req, res) {
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

            return res.status(200).json({user})
        } catch(error) {
            return res.status(404).json({message: "Token inválido."})
        }
    }
}


export default authController