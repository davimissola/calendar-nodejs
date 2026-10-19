import mssql from 'mssql'
import 'dotenv/config'


const CONNECTION_STRING = process.env.CONNECTION_STRING


async function conectaDb() {
    try {
        const pool = await mssql.connect(CONNECTION_STRING)
        return pool
    } catch(error) {
        console.log('Erro ao conectar no banco de dados.')
        throw error
    }
}



export default conectaDb