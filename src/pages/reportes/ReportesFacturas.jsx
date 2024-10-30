import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const ReportesFacturas = () => {

  const [selected, setSelected] = useState('')

  const handlerClick = (e) => {
    const { name } = e.target
    setSelected(name)
  }

  return (
    <div className='borLayout'>

      <nav className='navMenu' >
        <ul>
          <li className='li'>
            <Link
              name='porDia'
              className={`noDecoration link-menu ${selected == 'porDia'? 'selected': ''}`}
              to={'/reportes/facturas/recaudacion-por-dia'}
              onClick={handlerClick}
            >
              Recaudación por día
            </Link>
          </li>
          <li className='li'>
            <Link
              name='entreFechas'
              className={`noDecoration link-menu ${selected == 'entreFechas'? 'selected': ''}`}
              to={'/reportes/facturas/recaudacion-entre-fechas'}
              onClick={handlerClick}
            >
              Recaudación entre fechas
            </Link>
          </li>
          <li className='li'>
            <Link
              name='porEstado'
              className={`noDecoration link-menu ${selected == 'porEstado'? 'selected': ''}`}
              to={'/reportes/facturas/busqueda-por-estados'}
              onClick={handlerClick}
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
