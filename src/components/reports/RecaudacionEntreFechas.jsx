import { InputFechaRep } from './InputFechaRep'
import { useState, useEffect } from 'react'
import { fetchDataService } from '../../services'
import { obtenerFechaActual } from '../../utils'
import '../../styles/components/report/ventaReporte.css'
import { Reporte } from './Reporte'

const RecaudacionEntreFechas = () => {

    const [data, setData] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [fechaInputDesde, setFechaInputDesde] = useState('')
    const [fechaInputHasta, setfechaInputHasta] = useState('')
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

            <Reporte
                busquedaRealizada={busquedaRealizada}
                data={data}
            />
        </div>
    )
}

export default RecaudacionEntreFechas