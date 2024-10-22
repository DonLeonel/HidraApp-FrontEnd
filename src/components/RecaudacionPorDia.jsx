import { fetchDataService } from '../services/apiService'
import '../styles/components/recaudacionPorDia.css'
import { useState, useEffect } from 'react'
import { obtenerFechaActual } from '../utils/formatoFecha'
import { formatARS } from '../utils/formatoPrecios'
import { BoxRecaudacion } from './BoxRecaudacion'

export const RecaudacionPorDia = () => {
    const [data, setData] = useState(null)
    const [fechaInput, setFechaInput] = useState('')
    const [fechaActual, setFechaActual] = useState('')
    const [mostrarFacturas, setMostrarFacturas] = useState(false)
    const [busquedaRealizada, setBusquedaRealizada] = useState(false)


    useEffect(() => {
        setFechaActual(obtenerFechaActual())
        setFechaInput(obtenerFechaActual())
    }, [])

    const handlerSearch = (e) => {
        e.preventDefault()
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                'Content-Type': 'application/json',
                fecha: fechaInput
            }
        }
        const fetchInfo = async () => {
            const { data } = await fetchDataService(
                { entity: 'reporte/recaudacion-por-dia', options }
            )
            !data ? setData(null) : setData(data)
            setBusquedaRealizada(true)
        }

        fetchInfo()
        return () => abortController.abort()
    }

    const handlerVerFacturas = () => {
        mostrarFacturas ?
            setMostrarFacturas(false)
            : setMostrarFacturas(true)
    }

    return (
        <div className='contRecaudacionPorDia'>
            <section>

                <form action="">
                    <div>
                        <input
                            name='fecha'
                            type='date'
                            value={fechaInput}
                            max={fechaActual}
                            onChange={(e) => setFechaInput(e.target.value)}
                        />
                    </div>
                    <button onClick={handlerSearch}>Buscar</button>
                </form>

                {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
                {busquedaRealizada && !data && <h5 className='h5'>No hay reportes para la fecha indicada.</h5>}

                {data &&
                    <div className='reporte'>
                        <hr />
                        <h4 className='fechaConsulta'>FECHA DE CONSULTA: <span>{data.fecha}</span></h4>
                        <section className='contTotales'>
                            <BoxRecaudacion nombre={'Cant. de facturas'} total={data.facturas.length} />
                            <BoxRecaudacion nombre={'Total en Cheques'} total={formatARS(data.totalCheque)} />
                            <BoxRecaudacion nombre={'Total en Contado'} total={formatARS(data.totalContado)} />
                            <BoxRecaudacion nombre={'Total en Credito'} total={formatARS(data.totalCredito)} />
                            <BoxRecaudacion nombre={'Total en Fiado'} total={formatARS(data.totalFiado)} />
                            <BoxRecaudacion nombre={'Total en Transferencias'} total={formatARS(data.totalTransferencia)} />
                        </section>                        
                        <div className='total'>
                            <h4>Total: <span>{formatARS(data.total)}</span></h4>
                        </div>
                        <div className='contBtnVerFacturas'>
                            <button
                                className='btnVerFacturas'
                                onClick={handlerVerFacturas}
                            >
                                {mostrarFacturas ? 'Ocultar facturas' : ' Ver facturas'}
                            </button>
                        </div>

                        <div className='contFacturas'>
                            {
                                mostrarFacturas &&
                                data.facturas.map(f => {
                                    return (
                                        <div
                                            className='facturas'
                                            key={f.id}
                                        >
                                            <div className='boxDetalles'>
                                                <div className='infoFactura'>
                                                    <h4>Núm de factura: <span>{f.id}</span></h4>
                                                    <h4>Fecha/Hora: <span className='fechaHora'>{f.fechaHora}</span></h4>
                                                    <h4>Cliente: <span className='cliente'>{`${f.cliente.nombre} ${f.cliente.apellido}`}</span></h4>
                                                    <h4>Forma de pago: <span>{f.formaDePago.nombre}</span></h4>
                                                    <h4>Estado: <span>{f.estado.toLowerCase()}</span></h4>
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
                    </div>
                }
            </section>
        </div>
    )
}