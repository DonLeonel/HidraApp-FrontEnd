import '../styles/components/boxBarrios.css'
import { useEffect } from 'react'
import { fetchDataService } from '../services/apiService'
import { useState } from 'react'

export const BoxBarrios = ({ setIdBarrios }) => {
    const [barrios, setBarrios] = useState([])
    const [idBarrioSeleccionado, setIdBarrioSeleccionado] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal
        }
        const fetchInfo = async () => {
            const { data: barrios, error } = await fetchDataService(
                { entity: 'barrio', options }
            )
            error ? console.error(error) : setBarrios(barrios)
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const handlerClick = (id) => {
        if (!idBarrioSeleccionado || id !== idBarrioSeleccionado) {
            setIdBarrios(id)
            setIdBarrioSeleccionado(id)        
        } else {
            setIdBarrioSeleccionado(null)
            setIdBarrios(null)
        }
    }

    return (
        <div className='contSelectorBarrios'>

            {barrios && barrios.map(b => {
                return (
                    <div
                        key={b.id}
                        onClick={() => handlerClick(b.id)}
                        className={idBarrioSeleccionado === b.id ? 'seleccionado' : 'barrio'}
                    >
                        <h5>{b.nombre}</h5>
                    </div>
                )
            })}

        </div>
    )
}
