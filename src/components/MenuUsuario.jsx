import React from 'react'
import '../styles/index.css'
import { Link } from 'react-router-dom'

export const MenuUsuario = () => {

  const desloguear = () => {
    alert('Usted a deslogueado.')
  }

  return (
    <nav className='headerNav'>
        <div className='contLogo borLayout'>
            <Link to={'/'}><h1>LOGO</h1></Link>
        </div>

        <div className='contOpcUser borLayout'>
            <ul className='ulFlexRow'>
                <li className='li-noStyle'><button onClick={desloguear}><span className='salir'>Salir</span></button></li>
                <li className='li-noStyle'><Link to={'/usuario'}><img rel='icon' src='/icons-app/user-icon.png' alt="icon user" /></Link></li>
            </ul>
        </div>
    </nav>
  )
}
