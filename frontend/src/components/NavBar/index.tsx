import './navbar.css'
import { Link } from 'react-router-dom'



export function NavBar() {
    return (
        <div className='navbar'>
            <div className="navbar__div-user">
                <h2>davimissola</h2>
            </div>
            <div className="navbar__div-navbar">         
                <Link to='/' className='link-ativo'>Home</Link>   
                <Link to='/'>Grupos</Link> 
                <Link to='/'>Eventos</Link>    
                <Link to='/'>Logout</Link>  
            </div>
            <div>

            </div>
        </div>
    )
}