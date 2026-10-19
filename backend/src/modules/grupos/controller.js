import grupos from "./models.js"
import { podeEntrarGrupo } from "./services.js"


class gruposController {

    static async listarGrupos(req, res) {
        try {
            const resposta = await grupos.listarGrupos()
            return res.status(200).json({resposta})
        } catch(error) {
            return res.status(500).json({message: error})
        }   
    }

    static async listarGruposUser(req, res) {
        try {
            const user = req.user
            const resposta = await grupos.listarGruposUser(user.id)
            return res.status(200).json({resposta})
        } catch(error) {
            return res.status(500).json({error})
        }
    }

    static async addGrupo(req, res) {
        try {
            const {nome, privado, senha=null, cargo=null} = req.body
            const user = req.user

            const id_grupo = await grupos.addGrupo(nome, privado, senha)
            if (!id_grupo) {
                return res.status(400).json({message: "Nenhum grupo criado."})
            }
            
            const resposta = await grupos.addUsuarioGrupo(user.id, id_grupo, cargo)
            if (resposta < 1) {
                return res.status(400).json({message: "Erro ao criar UsuarioGrupo."})
            }

            return res.status(200).json({message: "Grupo criado com sucesso."})
        } catch(error) {
            return res.status(500).json({message: error})
        }   
    }

    static async deleteGrupo(req, res) {

    }
}


export default gruposController