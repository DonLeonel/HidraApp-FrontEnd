import { Link } from 'react-router-dom'
import { RoutesPrivadas } from '../../utils'
import '../../styles/components/dashboard/nuevaVenta.css'


export const NuevaVenta = () => {
  return (
    <div className='contBtnNvaVnt borLayout'>
      <Link
        to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.VENTAS}/${RoutesPrivadas.NUEVO}`}
        className='linkNuevaVnta'
      >
        <span>Nueva Venta</span>
      </Link>
    </div>
  )
}
