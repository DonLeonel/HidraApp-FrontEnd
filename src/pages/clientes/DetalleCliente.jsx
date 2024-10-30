import { Link, useParams } from 'react-router-dom'
import { fetchDataService } from '../../services/apiService'
import { useState, useEffect } from 'react'
import '../../styles/pages/detalleCliente.css'
import { formatARS } from '../../utils/formatoPrecios'
import { getClassName } from '../../utils/EstadosFactura'

export const DetalleCliente = () => {

    const { id } = useParams()
    const [cliente, setCliente] = useState(null)
    const [facturas, setFacturas] = useState([])
    const [mostrarHistorial, setMostrarHistorial] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: cliente, error } = await fetchDataService(
                { entity: 'cliente', id, options }
            )
            error ? console.error(error) : setCliente(cliente)
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    useEffect(() => {
        if (mostrarHistorial) {
            const abortController = new AbortController()
            const { signal } = abortController

            const options = {
                signal
            }
            const fetchInfo = async () => {
                const { data: facturas, error } = await fetchDataService(
                    { entity: `factura/por-cliente/${cliente.id}`, options }
                )
                error ? console.error(error) : setFacturas(facturas)
            }
            fetchInfo()
            return () => abortController.abort()
        }
    }, [mostrarHistorial])

    const handlerHistorial = () => {
        mostrarHistorial ?
            setMostrarHistorial(false)
            : setMostrarHistorial(true)
    }

    return (
        <div className='contDetalleCliente borLayout'>
            <h4 className='tituloLayout'>Detalle Cliente</h4>

            {
                cliente &&
                <>
                    <div className='datosCliente'>
                        <div className='detalles'>
                            <h4>Id: <span>{cliente.id}</span></h4>
                            <h4>Nombre: <span>{cliente.nombre}</span></h4>
                            <h4>Apellido: <span>{cliente.apellido}</span></h4>
                        </div>
                        <div className='detalles'>
                            <h4>Celular: <span>{cliente.celular}</span></h4>
                            <h4>Barrio: <span>{cliente.barrio.nombre}</span></h4>
                            <h4>Cant. Compras: <span>{cliente.cantCompras}</span></h4>
                            {
                                cliente.updatedAt && <h4>Actualizado: <span className='fechaHora'>{cliente.updatedAt}</span></h4>
                            }
                        </div>
                    </div>
                    {
                        cliente.ubicacion &&
                        <div className='datoUbicacion'>
                            <h4>Direccion: <span>{cliente.ubicacion.direccion}</span></h4>
                            <h4>Localidad: <span>{cliente.ubicacion.localidad}</span></h4>
                        </div>
                    }

                    {   cliente.cantCompras > 0 &&                  
                        <div className='contBtnVerHistorial'>
                            <button
                                className='btnVerHistorial'
                                onClick={handlerHistorial}
                            >
                               {mostrarHistorial ? 'Ocultar historial' : ' Ver Historial'}
                            </button>
                        </div>
                    }

                    <div className='contHistorial'>
                        {
                            mostrarHistorial &&
                            facturas.map(f => {
                                return (
                                    <div
                                        className='facturas'
                                        key={f.id}
                                    >
                                        <div className='boxDetalles'>
                                            <div className='infoFactura'>
                                                <h4>Núm de factura: <span>{f.id}</span></h4>
                                                <h4>Fecha/Hora: <span className='fechaHora'>{f.fechaHora}</span></h4>
                                                <h4>Forma de pago: <span>{f.formaDePago.nombre.toUpperCase()}</span></h4>
                                                <h4>Estado: <span className={getClassName(f.estado)}>{f.estado.toUpperCase()}</span></h4>
                                                {
                                                    f.updatedAt && <h4>Actualizacion: <span className='fechaHora'>{f.updatedAt}</span></h4>
                                                }
                                            </div>
                                        </div>
                                        <div className='boxProductos'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {f.detallesFactura.map(d => {
                                                        return (
                                                            <tr key={d.id}>
                                                                <td>{d.producto.nombre}</td>
                                                                <td>{d.cantidad}</td>
                                                                <td>{formatARS(d.subTotal)}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            <hr />
                                            <div className='total'>
                                                <h4>Total: {formatARS(f.total)}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }

            <div className='contBtn contEntradas'>
                <Link className='btnVolver' to={'/clientes'}>Volver</Link>
            </div>
        </div>
    )
}