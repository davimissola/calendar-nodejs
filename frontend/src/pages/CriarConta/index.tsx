import { Link, useNavigate } from 'react-router-dom'
import '../auth.css'
import { useState, type FormEvent } from 'react'
import type { AuthErrorResponse } from '../../types/auth'




export function CriarConta() {
    const [erro, setErro] = useState<string | null>(null)
    const navigate = useNavigate()

    async function CriarConta(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            
            const formData = new FormData(e.currentTarget)
            
            const username: string = String(formData.get('username'))
            const senha: string = String(formData.get('senha'))
            const confirmar_senha: string = String(formData.get('confirmar-senha'))

            if (/\s/g.test(username)) {
                setErro('Não coloque espaços no username.')
                return
            }
            if (senha != confirmar_senha) {
                setErro('Senhas diferentes.')
                return
            }

            const response = await fetch('http://localhost:3000/criar-conta', {
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

            navigate('/login')
        } catch(error) {
            setErro(error)
        }
    }


    return (
        <main className="page-auth page-criarconta">
            <form onSubmit={CriarConta} className='auth__form'>
                <h2>Faça parte</h2>

                <div className="auth__campo-form">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' placeholder='davimissola' />
                </div>
                <div className="auth__campo-form">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id='senha' name='senha' placeholder='***********' />
                </div>
                <div className="auth__campo-form">
                    <label htmlFor="confirmar-senha">Confirmar senha</label>
                    <input type="password" id='confirmar-senha' name='confirmar-senha' placeholder='***********' />
                </div>

                <p>{erro}</p>

                <button>Continue</button>
                <span>Já tem conta? <Link to='/login'>Faça login</Link></span>
            </form>

            <div className="auth__infos">
                <div>
                    <h2>Seus eventos, em grupo</h2>
                    <p>Junte seus amigos e organize cada momento.</p>
                </div>
            </div>
        </main>
    )
}