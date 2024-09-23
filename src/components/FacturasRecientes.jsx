import { Link } from 'react-router-dom'
import { fetchDataPaginatedService } from '../services/apiService'
import '../styles/components/facturasRecientes.css'
import { useState, useEffect } from 'react'


export const FacturasRecientes = () => {

  const paginateInit = { page: 0, size: 5 }
  const [paginate, setPaginate] = useState(paginateInit)
  const [facturas, setFacturas] = useState([])

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
      }
    }
    fetchInfo()
    return () => abortController.abort()
  }, [paginate])


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
          {facturas && facturas.map((f) => {
            return (
              <tr key={f.id}>
                <td>{f.cliente.nombre + ' ' + f.cliente.apellido}</td>
                <td>{f.fechaHora}</td>
                <td>$ {f.total}</td>
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