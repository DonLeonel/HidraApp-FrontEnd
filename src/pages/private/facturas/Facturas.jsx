import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../../hooks'
import { fetchDataPaginatedService } from '../../../services'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Role, RoutesPrivadas, formatARS } from '../../../utils'
import { CuadroMensajeEliminar, BusquedaYNuevo, TableRowLoading } from '../../../components'
import '../../../styles/pages/pagesEnComun.css'

const Facturas = () => {

    const userState = useSelector((state) => state.user)
    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [facturas, setFacturas] = useState([])
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
            const { content: facturas, error } = await fetchDataPaginatedService(
                { entity: 'factura', paginate, options })
            if (error) {
                console.error(error)
            } else {
                setFacturas(facturas)
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
    } = useSearchDinamic(facturas, ['fechaHora'], { esFactura: true });

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('factura', { setRecargar });

    return (
        <div className='contFacturas borLayout'>
            <h4 className='tituloLayout'>Facturas</h4>

            {mostrarDialogo &&
                <CuadroMensajeEliminar
                    entidad={'Factura'}
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
                        elementosFiltrados.map((f) => {
                            return (
                                <tr className='trComprador colorParImpar' key={f.id}>
                                    <td>{f.cliente.nombre + ' ' + f.cliente.apellido}</td>
                                    <td> <span className='fechaHora'>{f.fechaHora.split(' ')[0]}</span></td>
                                    <td >{formatARS(f.total)}</td>
                                    <td className='tdFlex'>
                                        <Link title='detalle' to={`${RoutesPrivadas.DETALLE}/${f.id}`}>
                                            <img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' />
                                        </Link>
                                        {(userState.role === Role.ADMIN) &&
                                            <>
                                                <Link title='editar' to={`${RoutesPrivadas.EDITAR}/${f.id}`}>
                                                    <img className='editar' src='/icons-app/lapiz.png' alt='editar' />
                                                </Link>
                                                <button onClick={() => iniciarEliminacion(f.id)} title='borrar' to={'/facturas/' + f.id}>
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

export default Facturas