import eventos from "./models.js"



class eventosController {

    static async listarEventos(req, res) {
        try {
            const resultado = await eventos.listarEventos()

            if (!resultado) {
                return res.status(400).json({message: "Não foi possível ver eventos."})
            }

            return res.status(200).json({eventos: resultado})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }

    static async getEvento(req, res) {
        try {
            const { id_evento } = req.params
            console.log(id_evento)
            const resultado = await eventos.getEvento(id_evento)

            if (!resultado) {
                return res.status(400).json({message: "Evento não encontrado."})
            }

            return res.status(200).json({evento: resultado})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }

    static async adicionarEvento(req, res) {
        try {
            const { titulo, descricao = null, data, horario } = req.body

            // teste, criar modulo user pra pegar pelo token
            const id_usuario = 3

            const resultado = await eventos.adicionarEvento(titulo, descricao, data, horario, id_usuario)

            if (resultado < 1) {
                return res.status(400).json({message: 'Nenhum evento criado.'})
            }

            return res.status(200).json({message: 'Evento criado com sucesso.'})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }

    static async removerEvento(req, res) {
        try {
            const { id_evento } = req.params

            const resultado = await eventos.removerEvento(id_evento)

            if (resultado < 1) {
                return res.status(400).json({message: 'Nenhum evento deletado.'})
            }

            return res.status(200).json({message: 'Evento deletado com sucesso.'})
        } catch(error) {
            return res.status(500).json({message: error})
        }
    }
}


export default eventosController