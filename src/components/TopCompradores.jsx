import '../styles/components/topCompradores.css'
import { fetchDataPaginatedService } from '../services/apiService'
import { useEffect, useState } from 'react'

export const TopCompradores = () => {

    const paginateInit = { page: 0, size: 3 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                sortType: 'LOWER'
            }
        }
        const fetchInfo = async () => {
            const { content: clientes, error } = await fetchDataPaginatedService(
                { entity: 'cliente', paginate, options }
            )

            if (error) {
                console.log(error)
            } else {
                setClientes(clientes)
            }
        }
        fetchInfo()

        return () => abortController.abort()
    }, [])

    return (
        <div className='contTopCompradores borLayout'>
            <h4 className='tituloLayout'>Top compradores</h4>

            <table className='tableTopCompradores'>
                <thead className='tableHeader'>
                    <tr>
                        <th className='cliente'>Cliente</th>
                        <th>Compras</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {clientes && clientes.map((c) => {
                        return (
                            <tr className='trComprador' key={c.id}>
                                <td>{c.nombre + ' ' + c.apellido}</td>
                                <td className='cant_compras'>{c.cantCompras}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
