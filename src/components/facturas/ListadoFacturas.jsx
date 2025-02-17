import { Link } from "react-router-dom"
import { formatARS, getClassNameEstado, RoutesPrivadas } from "../../utils"
import '../../styles/pages/pagesEnComun.css'

export const ListadoFacturas = ({ facturas }) => {
    return (
        !facturas ? <h5>No hay facturas</h5>
            : <>
                <table className='tablePages'>
                    <thead className='tableHeader'>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>detalle</th>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {facturas &&
                            facturas.map((f) => {
                                return (
                                    <tr className='trComprador colorParImpar' key={f.id}>
                                        <td>{f.id}</td>
                                        <td> <span className='fechaHora'>{f.fechaEmision}</span></td>
                                        <td >{formatARS(f.total)}</td>
                                        <td >
                                            <Link title='detalle' to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.DETALLE}/${f.id}`}>
                                                <img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' />
                                            </Link>
                                        </td>
                                    </tr>)
                            })}
                    </tbody>
                </table>
            </>

    )
}