import { fetchDataService } from '../../services'
import { useState, useEffect } from 'react'
import { obtenerFechaActual } from '../../utils'
import { InputFechaRep } from './InputFechaRep'
import '../../styles/components/report/ventaReporte.css'
import { Reporte } from './Reporte'

const RecaudacionPorDia = () => {

    const [data, setData] = useState(null)
    const [fechaInput, setFechaInput] = useState('')
    const [fechaActual, setFechaActual] = useState('')    
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

    return (
        <div className='contRecaudacionPorDia'>
            <form className='contInputFecha'>
                <InputFechaRep
                    setFechaInput={setFechaInput}
                    fechaInput={fechaInput}
                    fechaActual={fechaActual}
                    handlerSearch={handlerSearch}
                />
                <button onClick={handlerSearch}>Buscar</button>
            </form>

            <Reporte 
                busquedaRealizada={busquedaRealizada}
                data={data}                            
            />
        </div>
    )
}

export default RecaudacionPorDia