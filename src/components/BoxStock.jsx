import { getClassNameStock } from '../utils'
import '../styles/components/boxStock.css'

export const BoxStock = ({ nombre, cantidad }) => {
  return (
    <div className='box'>
      <span className='nombre'>{nombre}</span>
      <span className={getClassNameStock(cantidad)}>{cantidad == 0 ? 'AGOTADO' : cantidad}</span>
    </div>
  )
}