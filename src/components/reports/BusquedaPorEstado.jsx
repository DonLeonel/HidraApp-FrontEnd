import { useState, useEffect } from 'react'
import { getClassNameEstado, getEstadosEditarFactura, formatARS } from '../../utils'
import { fetchDataService } from '../../services'
import { BoxRecaudacion } from '.'
import '../../styles/components/report/facturaReporte.css'
import { ButtonVerOcultar } from '../buttons'
import { FacturaHistorial } from '../facturas'

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
                    <div className='contButtonVerOcultar'>
                        <ButtonVerOcultar
                            text={'Facturas'}
                            handleVerOcultar={handlerVerFacturas}
                            ver={mostrarFacturas}
                        />
                    </div>

                    <div className='contFacturas'>
                        {
                            mostrarFacturas &&
                            data.facturas.map(f => {
                                return (
                                    <FacturaHistorial 
                                        key={f.id}
                                        f={f}
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

export default BusquedaPorEstado