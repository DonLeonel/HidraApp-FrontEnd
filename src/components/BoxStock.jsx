import React from 'react'
import '../styles/components/boxStock.css'

export const BoxStock = ({nombre, cantidad}) => {
  return (
    <div className='box'>
        <span className='nombre'>{nombre}</span>
        <span className='cantidad'>{cantidad}</span>
    </div>
  )
}
