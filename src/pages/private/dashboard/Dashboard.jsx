import {
  MenuPages, FacturasRecientes, TopCompradores, Stock, NuevaVenta,
  VentasRecientes
} from '../../../components'
import '../../../styles/pages/dashboard.css'
import '../../../styles/pages/pagesEnComun.css'

const Dashboard = () => {
  return (
    <div className='contDashboard '>
      <div className='grid-1'>
        <MenuPages />
        <div>
          <NuevaVenta />
          <TopCompradores />
        </div>
        <div className='row-completa'>
          <Stock />
          <VentasRecientes />
          <FacturasRecientes />
        </div>
      </div>
    </div>
  )
}

export default Dashboard