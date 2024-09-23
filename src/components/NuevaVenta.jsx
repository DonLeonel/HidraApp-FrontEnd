import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/nuevaVenta.css'

export const NuevaVenta = () => {
  return (
    <div className='contBtnNvaVnt borLayout'>
        <Link to={'/nueva-factura'} className='linkNuevaVnta' ><span>Nueva Venta</span></Link>
    </div>
  )
}
