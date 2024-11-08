import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/nuevaVenta.css'
import { RoutesPrivadas } from '../utils/router'


export const NuevaVenta = () => {
  return (
    <div className='contBtnNvaVnt borLayout'>
      <Link
        to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.NUEVO}`}
        className='linkNuevaVnta'
      >
        <span>Nueva Venta</span>
      </Link>
    </div>
  )
}
