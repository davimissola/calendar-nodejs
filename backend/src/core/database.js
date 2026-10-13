import mssql from 'mssql'
import 'dotenv/config'


const CONNECTION_STRING = process.env.CONNECTION_STRING


async function conectaDb() {
    try {
        await mssql.connect(CONNECTION_STRING)
        return mssql
    } catch {
        console.log('Erro ao conectar no banco de dados.')
    }
}



export default conectaDb