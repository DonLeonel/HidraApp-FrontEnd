import '../../styles/components/clientes/boxBarrios.css'
import { fetchDataService } from '../../services'
import { useState, useEffect } from 'react'
import { Loading } from '../loading'

export const BoxBarrios = ({ setIdBarrios }) => {
    const [barrios, setBarrios] = useState([])
    const [loading, setLoading] = useState(true)
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
            if (error) console.error(error)
            else {
                setBarrios(barrios)
                setLoading(false)
            }
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

            {loading ?
                <Loading
                    width={'98%'}
                    height={'65px'}
                /> :
                barrios && barrios.map(b => {
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
