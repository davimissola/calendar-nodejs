import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'




const JWT_SECRET = process.env.JWT_SECRET



export async function criarHash(senha) {
    return await bcrypt.hash(senha, 12)
}

export async function compararHash(senha, senha_hash) {
    return await bcrypt.compare(senha, senha_hash)
}

export async function criarJwt(id) {
    const token = jwt.sign(
        { id: id},
        JWT_SECRET,
        { expiresIn: '7d'}
    )

    return token
}

export async function verificarJwt(token) {
    return jwt.verify(token, JWT_SECRET)
}


