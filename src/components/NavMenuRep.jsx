import { Link } from 'react-router-dom'
import '../styles/components/navMenuRep.css'
import { useState } from 'react';
export const NavMenuRep = () => {

    const [selected, setSelected] = useState('')

    const handlerClick = (e) => {
        const { name } = e.target
        setSelected(name)
    }
    return (
        <nav className='navMenu'>
            <ul>
                <li className='li'>
                    <Link
                        to='/reportes/facturas'
                        name='facturas'
                        className={`noDecoration btnMenu ${selected == 'facturas' ? 'selected' : ''}`}
                        onClick={handlerClick}
                    >
                        Facturas
                    </Link>
                </li>
                <li className='li'>
                    <Link
                        to='/reportes/clientes'
                        name='clientes'
                        className={`noDecoration btnMenu ${selected == 'clientes' ? 'selected' : ''}`}
                        onClick={handlerClick}
                    >
                        Clientes
                    </Link>
                </li>
                <li className='li'>
                    <Link
                        to='/reportes/productos'
                        name='productos'
                        className={`noDecoration btnMenu ${selected == 'productos' ? 'selected' : ''}`}
                        onClick={handlerClick}
                    >
                        Productos
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
