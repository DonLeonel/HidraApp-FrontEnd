import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { RoutesRepAnidadas } from '../../../utils'

const ReportesFacturas = () => {

  const [selected, setSelected] = useState('')

  const handlerClick = (e) => {
    const { name } = e.target
    setSelected(name)
  }

  return (
    <div className='contReporteFacturas borLayout'>

      <nav className='navMenu' >
        <ul>
          <li className='li'>
            <Link
              name='porDia'
              className={`noDecoration link-menu ${selected == 'porDia' ? 'selected' : ''}`}
              to={RoutesRepAnidadas.RECAUDACION_POR_DIA}
              onClick={handlerClick}
            >
              Recaudación por día
            </Link>
          </li>
          <li className='li'>
            <Link
              name='entreFechas'
              className={`noDecoration link-menu ${selected == 'entreFechas' ? 'selected' : ''}`}
              to={RoutesRepAnidadas.RECAUDACION_ENTRE_FECHAS}
              onClick={handlerClick}
            >
              Recaudación entre fechas
            </Link>
          </li>
          <li className='li'>
            <Link
              name='porEstado'
              className={`noDecoration link-menu ${selected == 'porEstado' ? 'selected' : ''}`}
              to={RoutesRepAnidadas.BUSQUEDA_POR_ESTADOS}
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

export default ReportesFacturas