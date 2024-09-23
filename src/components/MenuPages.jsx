import React from 'react'
import '../styles/components/menuPages.css'
import { Link } from 'react-router-dom'

export const MenuPages = () => {
  return (
    <nav className='menuPagesNav borLayout'>
        <ul>            
            <li className='li-noStyle'><Link className='noDecoration' to={'/clientes'}>
              <img rel='icon' src='/icons-app/clientes.png' alt="icon clientes" /><span className='span'>Clientes</span></Link></li>
            
            <li className='li-noStyle'><Link className='noDecoration' to={'/facturas'}>
              <img rel='icon' src='/icons-app/facturas.png' alt="icon facturas" />Facturas</Link></li>
            
            <li className='li-noStyle'><Link className='noDecoration' to={'/productos'}>
              <img rel='icon' src='/icons-app/productos.png' alt="icon productos" />Productos</Link></li>
            
            <li className='li-noStyle'><Link className='noDecoration' to={'/categorias'}>
              <img rel='icon' src='/icons-app/categorias.png' alt="icon categorias" />Categorías</Link></li>
            
            <li className='li-noStyle'><Link className='noDecoration' to={'/reportes'}>
              <img rel='icon' src='/icons-app/reportes.png' alt="icon reportes" />Reportes</Link></li>
        </ul>
    </nav>
  )
}