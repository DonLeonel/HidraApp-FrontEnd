import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../../hooks'
import { fetchDataPaginatedService } from '../../../services'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Role, RoutesPrivadas, formatARS } from '../../../utils'
import { CuadroMensajeEliminar, BusquedaYNuevo, TableRowLoading } from '../../../components'
import '../../../styles/pages/pagesEnComun.css'

const Ventas = () => {

    const userState = useSelector((state) => state.user)
    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(true)
    const [recargar, setRecargar] = useState(false);

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                sortType: 'UPPER'
            }
        }
        const fetchInfo = async () => {
            const { content: ventas, error } = await fetchDataPaginatedService(
                { entity: 'venta', paginate, options })
            if (error) {
                console.error(error)
            } else {
                setVentas(ventas)
                setLoading(false)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [paginate, recargar])

    const { termino,
        elementosFiltrados,
        listar,
        handleSearch,
        reset
    } = useSearchDinamic(ventas, ['fechaHora'], { esFactOVenta: true });

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('venta', { setRecargar });

    return (
        <div className='contFacturas borLayout'>
            <h4 className='tituloLayout'>Ventas</h4>

            {mostrarDialogo &&
                <CuadroMensajeEliminar
                    entidad={'la Venta'}
                    setDeseaBorrar={setDeseaBorrar}
                    setMostrarDialogo={setMostrarDialogo}
                />
            }

            <BusquedaYNuevo
                placeholder={'Buscar por fecha/nombre/apellido'}
                termino={termino}
                handleSearch={handleSearch}
                textButton={'Nueva Venta'}
            />

            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {loading ?
                        <TableRowLoading
                            cantFilas={8}
                            cantTd={4}
                            props={{ width: '95%', height: '18px', margin: '10px 0' }}
                        />
                        :
                        elementosFiltrados &&
                        elementosFiltrados.map((v) => {
                            return (
                                <tr className='trComprador colorParImpar' key={v.id}>
                                    <td>{v.cliente.nombre + ' ' + v.cliente.apellido}</td>
                                    <td> <span className='fechaHora'>{v.fechaHora.split(' ')[0]}</span></td>
                                    <td >{formatARS(v.total)}</td>
                                    <td className='tdFlex'>
                                        <Link title='detalle' to={`${RoutesPrivadas.DETALLE}/${v.id}`}>
                                            <img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' />
                                        </Link>
                                        {(userState.role === Role.ADMIN) &&
                                            <>
                                                <Link title='editar' to={`${RoutesPrivadas.EDITAR}/${v.id}`}>
                                                    <img className='editar' src='/icons-app/lapiz.png' alt='editar' />
                                                </Link>
                                                <button onClick={() => iniciarEliminacion(v.id)} title='borrar'>
                                                    <img className='borrar' src='/icons-app/basurero.png' alt='borrar' />
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>)
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Ventas