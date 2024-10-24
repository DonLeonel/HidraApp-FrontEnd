import { Link } from 'react-router-dom'
import { fetchDataPaginatedService } from '../services/apiService'
import '../styles/components/facturasRecientes.css'
import { useState, useEffect } from 'react'
import { formatARS } from '../utils/formatoPrecios'
import { TableRowLoading } from './loading/TableRowLoading'


export const FacturasRecientes = () => {

  const paginateInit = { page: 0, size: 5 }
  const [paginate, setPaginate] = useState(paginateInit)
  const [facturas, setFacturas] = useState([])
  const [loading, setLoading] = useState(true)

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
            <th>Detalle</th>
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
                <tr key={f.id}>
                  <td>{f.cliente.nombre + ' ' + f.cliente.apellido}</td>
                  <td><span className='fechaHora'>{f.fechaHora}</span></td>
                  <td>{formatARS(f.total)}</td>
                  <td className='tdFlex'>
                    <Link title='detalle' to={'/detalle-factura/' + f.id}><img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' /></Link>
                  </td>
                </tr>)
            })}
        </tbody>
      </table>
    </div>
  )
}