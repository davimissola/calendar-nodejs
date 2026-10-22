import { useEffect, useState } from 'react'
import { NavBar } from '../../components/NavBar'
import './home.css'
import { useNavigate } from 'react-router-dom'
import type { User, UserMeResponse } from '../../types/home'



export function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        async function buscarUsuario() {
            const response = await fetch('http://localhost:3000/me', {
                headers: {
                    'Authorization': token
                }
            })

            if (!response.ok) {
                navigate('/login')
                return
            }

            const data: UserMeResponse = await response.json()
            setUser(data.user)
        }
        buscarUsuario()
    }, [])
    return (
        <main className='page-home'>
            <NavBar user={user} />

            <div className="home__conteudo">
                <div className="home__inicio">
                    <div>
                        <h2>Olá, {user?.username}</h2>
                        <p>Seus grupos e eventos estão te esperando!</p>
                    </div>
                </div>
            </div>
        </main>
    )
}