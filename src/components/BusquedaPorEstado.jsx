import { useState, useEffect } from 'react'
import { getClassNameEstado, getEstadosEditarFactura, formatARS } from '../utils'
import { fetchDataService } from '../services'
import { BoxRecaudacion } from './BoxRecaudacion'
import '../styles/components/busquedaPorEstado.css'

const BusquedaPorEstado = () => {

    const [estados, setEstados] = useState([])
    const [inputEstado, setInputEstado] = useState('');
    const [data, setData] = useState(null);
    const [mostrarFacturas, setMostrarFacturas] = useState(false)
    const [busquedaRealizada, setBusquedaRealizada] = useState(false)

    useEffect(() => {
        setEstados(getEstadosEditarFactura())
    }, [])

    const handlerSearch = (e) => {
        e.preventDefault()
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                'Content-Type': 'application/json',
                estado: inputEstado
            }
        }
        const fetchInfo = async () => {
            const { data } = await fetchDataService(
                { entity: 'reporte/busqueda-por-estado', options }
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
        <div className='contBusquedaPorEstado'>
            <div className='inputEstado'>
                <select
                    name="estados"
                    id="estados"
                    value={inputEstado}
                    onChange={(e) => setInputEstado(e.target.value)}
                >
                    {estados?.map((e, i) =>
                        <option key={i} value={e}>{e}</option>
                    )}
                </select>
                <button onClick={handlerSearch}>Buscar</button>
            </div>

            {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
            {busquedaRealizada && !data && <h5 className='h5'>No hay reportes con el estado indicado.</h5>}


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
                                                <h4>Forma de pago: <span>{f.formaDePago.nombre.toUpperCase()}</span></h4>
                                                <h4>Estado: <span className={getClassNameEstado(f.estado)}>{f.estado.toUpperCase()}</span></h4>
                                                {f.entrega &&
                                                    <div className='nota'>
                                                        <h4>Entrego: <span>{formatARS(f.entrega)}</span> </h4>
                                                        <h4>Debe: <span>{formatARS(f.total - f.entrega)}</span></h4>
                                                    </div>
                                                }
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

export default BusquedaPorEstado