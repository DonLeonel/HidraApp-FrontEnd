import { Link } from 'react-router-dom'
import { RoutesPrivadas, RoutesPublicas } from '../../utils'
import { LogOut } from '..'
import { useSelector } from 'react-redux'
import '../../styles/index.css'

export const MenuUsuario = () => {

  const user = useSelector(state => state.user)

  return (
    <nav className='headerNav'>
      <div className='contLogo borLayout'>
        <Link
          to={user.id ?
            RoutesPrivadas.PRIVATE
            : RoutesPublicas.LOGIN}
        >
          <img className='img' src="/logo/logoHidra.jpg" alt="logoHidra" />
        </Link>
      </div>

      <div className='contOpcUser borLayout'>
        <ul className='ulFlexRow'>
          <li className='li-noStyle'>
            <LogOut />
          </li>
          <li className='li-noStyle'>
            <Link to={RoutesPrivadas.USUARIO}>
              <img rel='icon' src='/icons-app/user-icon.png' alt="icon user" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}