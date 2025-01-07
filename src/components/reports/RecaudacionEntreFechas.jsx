import { InputFechaRep } from './InputFechaRep'
import { useState, useEffect } from 'react'
import { fetchDataService } from '../../services'
import { BoxRecaudacion } from './BoxRecaudacion'
import { formatARS, obtenerFechaActual } from '../../utils'
import { VentaHistorial } from '../ventas'
import { ButtonVerOcultar } from '../buttons'
import '../../styles/components/report/ventaReporte.css'

const RecaudacionEntreFechas = () => {

    const [data, setData] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [fechaInputDesde, setFechaInputDesde] = useState('')
    const [fechaInputHasta, setfechaInputHasta] = useState('')
    const [mostrarVentas, setMostrarVentas] = useState(false)
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

    const handlerVerVentas = () => {
        mostrarVentas ?
            setMostrarVentas(false)
            : setMostrarVentas(true)
    }

    return (
        <div className='contRecaudacionEntreFechas'>
            <form className='contInputFecha'>
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
            </form>

            {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
            {busquedaRealizada && !data && <h5 className='h5'>No hay reportes para la fecha indicada.</h5>}

            {data &&
                <div className='reporte'>
                    <hr />
                    <section className='contTotales'>
                        <BoxRecaudacion nombre={'Cant. de facturas'} total={data.ventas.length} />
                        <BoxRecaudacion nombre={'Total en Cheques'} total={formatARS(data.totalCheque)} />
                        <BoxRecaudacion nombre={'Total en Contado'} total={formatARS(data.totalContado)} />
                        <BoxRecaudacion nombre={'Total en Credito'} total={formatARS(data.totalCredito)} />
                        <BoxRecaudacion nombre={'Total en Fiado'} total={formatARS(data.totalFiado)} />
                        <BoxRecaudacion nombre={'Total en Transferencias'} total={formatARS(data.totalTransferencia)} />
                    </section>
                    <div className='total'>
                        <h4>Total: <span>{formatARS(data.total)}</span></h4>
                    </div>
                    <div className='contButtonVerOCultar'>
                        <ButtonVerOcultar
                            text={'Ventas'}
                            handleVerOcultar={handlerVerVentas}
                            ver={mostrarVentas}
                        />
                    </div>

                    <div className='contFacturas'>
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

export default RecaudacionEntreFechas