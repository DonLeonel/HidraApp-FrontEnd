import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const ReportesFacturas = () => {
  return (
    <div className='borLayout'>

      <nav className='navMenu' >
        <ul>
          <li>
            <Link className='noDecoration link-menu' to={'/reportes/facturas/recaudacion-por-dia'}
            >
              Recaudación por día
            </Link>
          </li>
          <li>
            <Link className='noDecoration link-menu' to={'/reportes/facturas/recaudacion-entre-fechas'}
            >
              Recaudación entre fechas
            </Link>
          </li>
          <li>
            <Link className='noDecoration link-menu' to={'/reportes/facturas/estados'}
            >
              Buscar por estado
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>

  )
}
