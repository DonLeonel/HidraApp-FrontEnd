import { useState, useEffect } from "react";
import { BoxRecaudacion } from "./BoxRecaudacion"
import { fetchDataService } from "../services/apiService"
import { formatARS } from '../utils/formatoPrecios'
import '../styles/components/clientesMorosos.css'

const ClientesMorosos = () => {
  const [data, setData] = useState(null);
  const [mostrarClientes, setMostrarClientes] = useState(false)
  const [busquedaRealizada, setBusquedaRealizada] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const options = {
      signal
    }
    const fetchInfo = async () => {
      const { data } = await fetchDataService(
        { entity: 'reporte/clientes-morosos', options }
      )
      !data ? setData(null) : setData(data)
      setBusquedaRealizada(true)
    }

    fetchInfo()
    return () => abortController.abort()
  }, [])

  const handlerVerClientes = () => {
    mostrarClientes ?
      setMostrarClientes(false)
      : setMostrarClientes(true)
  }

  return (
    <div className='contClientesMorosos'>

      {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
      {busquedaRealizada && !data && <h5 className='h5'>No hay reportes de clientes morosos.</h5>}

      {data &&
        <div className='reporte'>
          <hr />
          <section className='contTotales'>
            <BoxRecaudacion nombre={'Cant. Clientes'} total={data.cantClientes} />
            <BoxRecaudacion nombre={'Total en Mora'} total={formatARS(data.totalEnMora)} />
          </section>
          <div className='contBtnVerClientes'>
            <button
              className='btnVerClientes'
              onClick={handlerVerClientes}
            >
              {mostrarClientes ? 'Ocultar clientes' : ' Ver clientes'}
            </button>
          </div>

          <div className='contClientes'>
            {
              mostrarClientes &&              
              data.clientesYTotal?.map(cYT => {
                return (
                  <div className='datosCliente'>
                    <div className='detalles'>
                      <h4>Id: <span>{cYT.cliente.id}</span></h4>
                      <h4>Nombre: <span>{cYT.cliente.nombre}</span></h4>
                      <h4>Apellido: <span>{cYT.cliente.apellido}</span></h4>
                    </div>
                    <div className='detalles'>
                      <h4>Celular: <span>{cYT.cliente.celular}</span></h4>
                      <h4>Barrio: <span>{cYT.cliente.barrio.nombre}</span></h4>
                      <h4>Total vencido: <span>{formatARS(cYT.total)}</span></h4>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default ClientesMorosos