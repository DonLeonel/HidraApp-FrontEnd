import { Link } from 'react-router-dom'
import '../../styles/components/report/navMenuRep.css'
import { useState } from 'react'
import { RoutesPrivadas } from '../../utils'

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
                        to={RoutesPrivadas.VENTAS}
                        name='ventas'
                        className={`noDecoration btnMenu ${selected == 'ventas' ? 'selected' : ''}`}
                        onClick={handlerClick}
                    >
                        Ventas
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
            </ul>
        </nav>
    )
}
