import { useEffect, useState } from 'react'
import { NavBar } from '../../components/NavBar'
import './home.css'
import { Link, useNavigate } from 'react-router-dom'
import type { User, UserMeResponse } from '../../types/home'
import { CalendarBlankIcon, MagnifyingGlassIcon, UserPlusIcon, UsersIcon, UsersThreeIcon } from '@phosphor-icons/react'



export function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        async function buscarUsuario() {
            if (!token) {
                navigate('/login')
                return
            }

            const response = await fetch('http://localhost:3000/me', {
                headers: {
                    'Authorization': token ?? ''
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
                    <div></div>
                    <h2>Olá, {user?.username}</h2>
                    <p>Seus grupos e eventos estão te esperando!</p>
                </div>
            </div>
            <div className="home__actions">
                <div className='actions__subtitulo'>
                    <div></div>
                    <h3>Por onde começamos?</h3>
                </div>
                <form action="#">
                    <div className='actions__input'>
                        <input type="text" placeholder='Como posso te ajudar hoje?' />
                        <button>
                            <MagnifyingGlassIcon size={28} weight="thin" />
                        </button>
                    </div>
                    <div className='actions__link'>
                        <Link to='/' >
                            <UsersIcon size={48} weight="thin" />
                            Ver grupos
                        </Link>
                        <Link to='#'>
                            <CalendarBlankIcon size={48} weight="thin" />
                            Ver eventos
                        </Link>
                        <Link to='#'>
                            <UsersThreeIcon size={48} weight="thin" />
                            Entrar em grupo
                        </Link>
                        <Link to='#'>
                            <UserPlusIcon size={48} weight="thin" />
                            Criar grupo
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}