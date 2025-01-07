import { fetchDataPaginatedService } from '../../services'
import { useState, useEffect } from 'react'
import { formatARS, RoutesPrivadas } from '../../utils'
import { TableRowLoading } from '../loading/TableRowLoading'
import '../../styles/components/dashboard/facturasRecientes.css'
import { useNavigate } from 'react-router-dom'

export const VentasRecientes = () => {
    const paginateInit = { page: 0, size: 5 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [ventas, setVentas] = useState([])
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
        const { content: ventas, error } = await fetchDataPaginatedService(
          { entity: 'venta', paginate, options })
        if (error) {
          console.log(error)
        } else {
          setVentas(ventas)
          setLoading(false)
        }
      }
      fetchInfo()
      return () => abortController.abort()
    }, [])
  
    return (
      <div className='contFacturas borLayout'>
        <h4 className='tituloLayout'>Últimas ventas realizádas</h4>
  
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
                cantTd={3}
              />
              :
              ventas && ventas.map((v) => {
                return (
                  <tr
                    className='trFacturaReciente'
                    key={v.id}
                    onClick={() => navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.VENTAS}/${RoutesPrivadas.DETALLE}/${v.id}`)}
                  >
                    <td>{v.cliente.nombre + ' ' + v.cliente.apellido}</td>
                    <td><span className='fechaHora'>{v.fechaHora}</span></td>
                    <td>{formatARS(v.total)}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
}