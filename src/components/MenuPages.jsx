import React from 'react'
import '../styles/components/menuPages.css'
import { Link } from 'react-router-dom'
import { RoutesPrivadas } from '../utils/router'
import { Role } from '../utils/rolEnum'
import { useSelector } from 'react-redux'

export const MenuPages = () => {
  const userState = useSelector((state) => state.user)

  return (
    <nav className='menuPagesNav borLayout'>
      <ul>
        <li className='li-noStyle'>
          <Link
            className='noDecoration'
            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.CLIENTES}`}
          >
            <img rel='icon' src='/icons-app/clientes.png' alt="icon clientes" /><span className='span'>Clientes</span>
          </Link>
        </li>

        <li className='li-noStyle'>
          <Link
            className='noDecoration'
            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}`}
          >
            <img rel='icon' src='/icons-app/facturas.png' alt="icon facturas" />Facturas
          </Link>
        </li>

        <li className='li-noStyle'>
          <Link
            className='noDecoration'
            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.PRODUCTOS}`}
          >
            <img rel='icon' src='/icons-app/productos.png' alt="icon productos" />Productos
          </Link>
        </li>

        <li className='li-noStyle'>
          <Link
            className='noDecoration'
            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.CATEGORIAS}`}
          >
            <img rel='icon' src='/icons-app/categorias.png' alt="icon categorias" />Categorías
          </Link>
        </li>
        { (userState.role === Role.ADMIN) &&
          <li className='li-noStyle'>
            <Link
              className='noDecoration'
              to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.REPORTES}`}
            >
              <img rel='icon' src='/icons-app/reportes.png' alt="icon reportes" />Reportes
            </Link>
          </li>
        }
      </ul>
    </nav>
  )
}