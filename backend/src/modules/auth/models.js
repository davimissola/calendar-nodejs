import conectaDb from '../../core/database.js'



class auth {

    static async criarConta(username, password) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            INSERT INTO FaceMash.Usuarios(username, password)
            VALUES
            ('${username}', '${password}')
            `)

        return resultado.rowsAffected[0]    
    }

    static async login(username, password) {
        const conexao = await conectaDb()
        const resultado = await conexao.query(`
            SELECT *
            FROM FaceMash.Usuarios
            WHERE username='${username}' AND
                  password='${password}'
            `)
        return resultado.recordset[0]
    }
}


export default auth