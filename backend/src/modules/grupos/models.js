import conectaDb from "../../core/database.js"
import { criarHash } from "../auth/service.js"


class grupos {

    static async listarGrupos() {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            SELECT *
            FROM CalendarNode.Grupos
            `)
        return resultado.recordset
    }

    static async listarGruposUser(id_user) {
        const conexao = await conectaDb()
        
        const request = conexao.request()
        request.input('id_user', id_user)

        const resposta = await request.query(`
            SELECT *
            FROM CalendarNode.Grupos g 
            INNER JOIN CalendarNode.UsuarioGrupo ug 
                ON g.id = ug.id_grupo 
            WHERE ug.id_usuario = @id_user
            `)
        return resposta.recordset
    }

    static async addGrupo(nome, privado, senha=null) {
        const conexao = await conectaDb()

        const isPrivado = privado ? 1 : 0
        let senhaHash = null
        if (senha && isPrivado) {
            senhaHash = await criarHash(senha)
        }

        const request = conexao.request()
        request.input('nome', nome)
        request.input('privado', privado)
        request.input('senha', senhaHash)


        const resultado = await request.query(`
            INSERT INTO CalendarNode.Grupos(nome, privado, senha)
            OUTPUT INSERTED.id
            VALUES
            (@nome, @privado, @senha)
            `)
        return resultado.recordset[0]?.id
    }

    static async deleteGrupo() {

    }




    static async addUsuarioGrupo(id_user, id_grupo, cargo) {
        const conexao = await conectaDb()

        const cargoFinal = cargo ? cargo : "membro"

        const request = conexao.request()
        request.input('id_user', id_user)
        request.input('id_grupo', id_grupo)
        request.input('cargo', cargoFinal)

        const resultado = await request.query(`
            INSERT INTO CalendarNode.UsuarioGrupo(id_usuario, id_grupo, cargo)
            VALUES
            (@id_user, @id_grupo, @cargo)
            `)
        return resultado.rowsAffected[0]
    }
}


export default grupos