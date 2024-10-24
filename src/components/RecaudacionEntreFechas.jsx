import '../styles/components/recaudacionEntreFechas.css'
import { InputFechaRep } from './InputFechaRep'
import { useState, useEffect } from 'react'
import { obtenerFechaActual } from '../utils/formatoFecha'
import { fetchDataService } from '../services/apiService'
import { BoxRecaudacion } from './BoxRecaudacion'
import { formatARS } from '../utils/formatoPrecios'
import { Loading } from './loading/Loading'

export const RecaudacionEntreFechas = () => {

    const [data, setData] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [fechaInputDesde, setFechaInputDesde] = useState('')
    const [fechaInputHasta, setfechaInputHasta] = useState('')
    const [mostrarFacturas, setMostrarFacturas] = useState(false)
    const [busquedaRealizada, setBusquedaRealizada] = useState(false)

    useEffect(() => {
        setFechaActual(obtenerFechaActual())
        setfechaInputHasta(obtenerFechaActual())
    }, [])

    const handlerSearch = (e) => {
        e.preventDefault()
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                'Content-Type': 'application/json',
                desde: fechaInputDesde,
                hasta: fechaInputHasta
            }
        }
        const fetchInfo = async () => {
            const { data } = await fetchDataService(
                { entity: 'reporte/recaudacion-entre-fechas', options }
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
        <div className='contRecaudacionEntreFechas'>
            <div className='contInputFecha'>
                <div>
                    <h4>Desde</h4>
                    <InputFechaRep
                        setFechaInput={setFechaInputDesde}
                        fechaInput={fechaInputDesde}
                        fechaActual={fechaActual}
                        handlerSearch={handlerSearch}
                    />
                </div>
                <div>
                    <h4>Hasta</h4>
                    <InputFechaRep
                        setFechaInput={setfechaInputHasta}
                        fechaInput={fechaInputHasta}
                        fechaActual={fechaActual}
                        handlerSearch={handlerSearch}
                    />
                </div>
                <button onClick={handlerSearch}>Buscar</button>
            </div>           

            {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
            {busquedaRealizada && !data && <h5 className='h5'>No hay reportes para la fecha indicada.</h5>}


            {data &&
                <div className='reporte'>
                    <hr />                    
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
        </div>
    )
}
