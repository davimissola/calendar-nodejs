import auth from './models.js'


class authController {

    static async criarConta(req, res) {
        try {
            const {username, password} = req.body
            const resultado = await auth.criarConta(username, password)

            if (resultado < 1) {
                return res.status(400).json({message: 'Nenhum usuário criado.'})
            }

            return res.status(201).json({message: 'Usuário criado.'})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }

    static async login(req, res) {
        try {
            const {username, password} = req.body
            const resultado = await auth.login(username, password)
            
            if (!resultado) {
                return res.status(404).json({message: 'Usuário não encontrado.'})
            }

            return res.status(200).json({message: `Usuário: ${resultado.username}`})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }
}


export default authController