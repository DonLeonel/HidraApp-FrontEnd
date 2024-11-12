import { fetchDataPaginatedService } from '../../services'
import { useEffect, useState } from 'react'
import { TableRowLoading } from '../loading'
import { useNavigate } from 'react-router-dom'
import { RoutesPrivadas } from '../../utils'
import '../../styles/components/dashboard/topCompradores.css'

export const TopCompradores = () => {

    const paginateInit = { page: 0, size: 3 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                sortType: 'UPPER',
                fieldBySort: 'cantCompras'
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
                setLoading(false)
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
                    {loading ?
                        <TableRowLoading
                            cantFilas={3}
                            cantTd={2}
                            props={{ width: '90%', height: '9px' }}
                        />                        :
                        clientes &&
                        clientes.map((c) => {
                            return (
                                <tr
                                    className='trTopComprador'
                                    key={c.id}
                                    onClick={() => navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.CLIENTES}/${RoutesPrivadas.DETALLE}/${c.id}`)}
                                >
                                    <td>{c.nombre + ' ' + c.apellido}</td>
                                    <td className='cant_compras'>{c.cantCompras}</td>
                                </tr>)
                        })}
                </tbody>
            </table>
        </div>
    )
}