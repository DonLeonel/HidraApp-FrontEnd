import '../styles/index.css'
import { Link } from 'react-router-dom'
import { RoutesPrivadas, RoutesPublicas } from '../utils/router'
import { LogOut } from './logout/LogOut'
import { useSelector } from 'react-redux'

export const MenuUsuario = () => {

  const user = useSelector(state => state.user)  
  
  return (
    <nav className='headerNav'>
      <div className='contLogo borLayout'>
        <Link to={user.id ? RoutesPrivadas.PRIVATE : RoutesPublicas.LOGIN }><h1>LOGO</h1></Link>
      </div>

      <div className='contOpcUser borLayout'>
        <ul className='ulFlexRow'>
          { user && user.id ?
            <>
              <li className='li-noStyle'>
                <LogOut />
              </li>

              <li className='li-noStyle'>
                <Link to={'/usuario'}>
                  <img rel='icon' src='/icons-app/user-icon.png' alt="icon user" />
                </Link>
              </li>
            </>
            :
            <li className='li-noStyle'>
              <Link className='link' to={RoutesPublicas.REGISTRARSE}>
                <span className='ingresar'>Registrarse</span>
              </Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}