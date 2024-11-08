import {
  MenuPages, FacturasRecientes, TopCompradores, Stock, NuevaVenta
} from '../../../components'
import '../../../styles/pages/dashboard.css'

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
          <FacturasRecientes />
        </div>
      </div>
    </div>
  )
}

export default Dashboard