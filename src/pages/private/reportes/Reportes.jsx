import { NavMenuRep } from '../../../components'
import { Outlet } from 'react-router-dom'
import '../../../styles/pages/reportes.css'

const Reportes = () => {
    return (
        <div className='contReportes'>
            <section className='borLayout' >
                <h4 className='tituloLayout'> Reportes</h4>
                <NavMenuRep />
            </section>
            <Outlet />
        </div >
    )
}

export default Reportes