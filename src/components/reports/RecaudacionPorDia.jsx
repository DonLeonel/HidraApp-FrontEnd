import { fetchDataService } from '../../services'
import { useState, useEffect } from 'react'
import { obtenerFechaActual, formatARS } from '../../utils'
import { BoxRecaudacion } from './BoxRecaudacion'
import { InputFechaRep } from './InputFechaRep'
import { VentaHistorial } from '../ventas'
import { ButtonVerOcultar } from '../buttons'
import '../../styles/components/report/ventaReporte.css'

const RecaudacionPorDia = () => {
    const [data, setData] = useState(null)
    const [fechaInput, setFechaInput] = useState('')
    const [fechaActual, setFechaActual] = useState('')
    const [mostrarVentas, setMostrarVentas] = useState(false)
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

    const handlerVerVentas = () => {
        mostrarVentas ?
            setMostrarVentas(false)
            : setMostrarVentas(true)
    }

    return (
        <div className='contRecaudacionPorDia'>
            <div className='contInputFecha'>
                <InputFechaRep
                    setFechaInput={setFechaInput}
                    fechaInput={fechaInput}
                    fechaActual={fechaActual}
                    handlerSearch={handlerSearch}
                />
                <button onClick={handlerSearch}>Buscar</button>
            </div>

            {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
            {busquedaRealizada && !data && <h5 className='h5'>No hay reportes para la fecha indicada.</h5>}

            {data &&
                <div className='reporte'>
                    <hr />
                    <section className='contTotales'>
                        <BoxRecaudacion nombre={'Cant. de ventas'} total={data.ventas.length} />
                        <BoxRecaudacion nombre={'Total en Cheques'} total={formatARS(data.totalCheque)} />
                        <BoxRecaudacion nombre={'Total en Contado'} total={formatARS(data.totalContado)} />
                        <BoxRecaudacion nombre={'Total en Credito'} total={formatARS(data.totalCredito)} />
                        <BoxRecaudacion nombre={'Total en Fiado'} total={formatARS(data.totalFiado)} />
                        <BoxRecaudacion nombre={'Total en Transferencias'} total={formatARS(data.totalTransferencia)} />
                    </section>
                    <div className='total'>
                        <h4>Total: <span>{formatARS(data.total)}</span></h4>
                    </div>
                    <div className='contButtonVerOculatar'>
                        <ButtonVerOcultar
                            text={'Ventas'}
                            handleVerOcultar={handlerVerVentas}
                            ver={mostrarVentas}
                        />
                    </div>

                    <div className='contVentas'>
                        {
                            mostrarVentas &&
                            data.ventas.map(v => {
                                return (
                                    <VentaHistorial
                                        key={v.id}
                                        venta={v}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default RecaudacionPorDia