import conectaDb from "../../core/database.js"



class eventos {

    static async listarEventos() {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            SELECT *
            FROM CalendarNode.Eventos
            `)

        return resultado.recordset
    }

    static async getEvento(id_evento) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            SELECT *
            FROM CalendarNode.Eventos
            WHERE id = ${id_evento}
            `)

        return resultado.recordset[0]
    }

    static async adicionarEvento(titulo, descricao, data, horario, id_usuario) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            INSERT INTO CalendarNode.Eventos(titulo, descricao, data, horario, id_usuario)
            VALUES
            ('${titulo}', '${descricao}', '${data}', '${horario}', ${id_usuario})
            `)

        return resultado.rowsAffected[0]
    }

    static async editarEvento() {

    }

    static async removerEvento(id_evento) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            DELETE FROM CalendarNode.Eventos
            WHERE id = ${id_evento}
            `)

        return resultado.rowsAffected[0]
    }
}



export default eventos