import { Link } from 'react-router-dom'
import '../styles/components/navMenuRep.css'
import { useState } from 'react'
import { RoutesPrivadas } from '../utils/router'

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
                        to={RoutesPrivadas.FACTURAS}
                        name='facturas'
                        className={`noDecoration btnMenu ${selected == 'facturas' ? 'selected' : ''}`}
                        onClick={handlerClick}
                    >
                        Facturas
                    </Link>
                </li>
                <li className='li'>
                    <Link
                        to={RoutesPrivadas.CLIENTES}
                        name='clientes'
                        className={`noDecoration btnMenu ${selected == 'clientes' ? 'selected' : ''}`}
                        onClick={handlerClick}
                    >
                        Clientes
                    </Link>
                </li>
                <li className='li'>
                    <Link
                        to={RoutesPrivadas.PRODUCTOS}
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
