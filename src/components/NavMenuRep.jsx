import { Link } from 'react-router-dom'
import '../styles/components/navMenuRep.css'

export const NavMenuRep = () => {
    return (
        <nav className='navMenu'>
            <ul>
                <li >
                    <Link
                        className='noDecoration btnMenu'
                        to='/reportes/facturas'
                    >
                        Facturas
                    </Link>
                </li>
                <li >
                    <Link
                        className='noDecoration btnMenu'
                        to='/reportes/clientes'
                    >
                        Clientes
                    </Link>
                </li>
                <li >
                    <Link
                        className='noDecoration btnMenu'
                        to='/reportes/productos'
                    >
                        Productos
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
