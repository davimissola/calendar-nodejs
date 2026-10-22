import { Link, useNavigate } from 'react-router-dom'
import '../auth.css'
import { useState, type FormEvent } from 'react'
import type { LoginResponse, AuthErrorResponse } from '../../types/auth'




export function Login() {
    const [erro, setErro] = useState<string | null>(null)
    const navigate = useNavigate()

    async function Login(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            
            const formData = new FormData(e.currentTarget)
            
            const username: string = String(formData.get('username'))
            const senha: string = String(formData.get('senha'))

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'senha': senha
                })
            }
            )

            if (!response.ok) {
                const data: AuthErrorResponse = await response.json()
                setErro(data.message)
                return
            }

            const data: LoginResponse = await response.json()
            localStorage.setItem('access_token', data.access_token)
            navigate('/')
        } catch(error) {
            setErro(error)
        }
    }

    return (
        <main className="page-auth page-login">
            <div className="auth__infos">
                <div>
                    <h2>Bom te ver de volta</h2>
                    <p>Seus grupos e eventos estão te esperando.</p>
                </div>
            </div>
            <form onSubmit={Login} className='auth__form'>
                <h2>Faça login</h2>

                <div className="auth__campo-form">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' placeholder='davimissola' required />
                </div>
                <div className="auth__campo-form">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id='senha' name='senha' placeholder='***********' required />
                </div>

                <p>{erro}</p>

                <button>Continue</button>
                <span>Ainda não tem conta? <Link to='/criar-conta'>Crie sua conta</Link></span>
            </form>
        </main>
    )
}