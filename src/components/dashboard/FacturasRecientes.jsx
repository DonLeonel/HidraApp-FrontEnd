import { Link } from 'react-router-dom'
import { fetchDataPaginatedService } from '../../services'
import { useState, useEffect } from 'react'
import { formatARS, RoutesPrivadas } from '../../utils'
import { TableRowLoading } from '../loading/TableRowLoading'
import '../../styles/components/dashboard/facturasRecientes.css'
import { useNavigate } from 'react-router-dom'

export const FacturasRecientes = () => {

  const paginateInit = { page: 0, size: 5 }
  const [paginate, setPaginate] = useState(paginateInit)
  const [facturas, setFacturas] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const options = {
      signal,
      headers: {
        sortType: 'UPPER'
      }
    }
    const fetchInfo = async () => {
      const { content: facturas, error } = await fetchDataPaginatedService(
        { entity: 'factura', paginate, options })
      if (error) {
        console.log(error)
      } else {
        setFacturas(facturas)
        setLoading(false)
      }
    }
    fetchInfo()
    return () => abortController.abort()
  }, [])

  return (
    <div className='contFacturas borLayout'>
      <h4 className='tituloLayout'>Últimas facturas realizádas</h4>

      <table className='tableFacturasRecientes'>
        <thead className='tableHeader'>
          <tr>
            <th>Cliente</th>
            <th>Fecha/Hora</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className='tableBody'>
          {loading ?
            <TableRowLoading
              cantFilas={5}
              cantTd={4}
            />
            :
            facturas && facturas.map((f) => {
              return (
                <tr
                  className='trFacturaReciente'
                  key={f.id}
                  onClick={() => navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.DETALLE}/${f.id}`)}
                >
                  <td>{f.cliente.nombre + ' ' + f.cliente.apellido}</td>
                  <td><span className='fechaHora'>{f.fechaHora}</span></td>
                  <td>{formatARS(f.total)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}