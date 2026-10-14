import conectaDb from '../../core/database.js'



class auth {

    static async criarConta(ra, username, hashed_senha) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            INSERT INTO CalendarNode.Usuarios(ra, username, senha)
            VALUES
            (${ra}, '${username}', '${hashed_senha}')
            `)

        return resultado.rowsAffected[0]    
    }

    static async login(username) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            SELECT *
            FROM CalendarNode.Usuarios
            WHERE username='${username}'
            `)
        return resultado.recordset[0]
    }
}


export default auth