import React from 'react'
import '../styles/components/boxStock.css'
import { getClassName } from '../utils/Stock'

export const BoxStock = ({ nombre, cantidad }) => {
  return (
    <div className='box'>
      <span className='nombre'>{nombre}</span>
      <span className={getClassName(cantidad)}>{cantidad == 0 ? 'AGOTADO' : cantidad}</span>
    </div>
  )
}
