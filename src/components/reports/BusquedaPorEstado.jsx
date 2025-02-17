import { useState, useEffect } from 'react'
import { getEstadosEditar } from '../../utils'
import { fetchDataService } from '../../services'
import '../../styles/components/report/ventaReporte.css'
import { Reporte } from './Reporte'

const BusquedaPorEstado = () => {

    const [estados, setEstados] = useState([])
    const [inputEstado, setInputEstado] = useState('');
    const [data, setData] = useState(null);    
    const [busquedaRealizada, setBusquedaRealizada] = useState(false)

    useEffect(() => {
        setEstados(getEstadosEditar())
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
                { entity: 'reporte/ventas-por-estado', options }
            )
            !data ? setData(null) : setData(data)
            setBusquedaRealizada(true)
        }

        fetchInfo()
        return () => abortController.abort()
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

            <Reporte 
                busquedaRealizada={busquedaRealizada}
                data={data}                
            />
        </div>
    )
}

export default BusquedaPorEstado