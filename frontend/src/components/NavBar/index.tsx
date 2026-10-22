import { CalendarDays, Home, LogOut, UserRound } from 'lucide-react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import userFoto from '../../assets/userfoto.jpg'
import type { PropsNavBar } from '../../types/home'



export function NavBar({ user }: PropsNavBar) {
    const navigate = useNavigate()


    function Logout() {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <div className='navbar'>
            <div className="navbar__div-user">
                <img src={userFoto} alt="foto do usuário" />
                <h2>@{ user?.username }</h2>
            </div>
            <div className="navbar__div-navbar">         
                <Link to='/' className='link-ativo'>
                    < Home strokeWidth={1.5} />
                    Home
                </Link>   
                <Link to='/'>
                    <UserRound strokeWidth={1.5} />
                    Grupos
                </Link> 
                <Link to='/'>
                    <CalendarDays strokeWidth={1.5} />
                    Eventos
                </Link>                  
            </div>
            <div className='navbar__div-footer'>
                <button onClick={() => Logout()}>
                    <LogOut strokeWidth={1.5} />
                    Logout
                </button>  
            </div>
        </div>
    )
}