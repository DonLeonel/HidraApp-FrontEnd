import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../../hooks'
import { fetchDataPaginatedService } from '../../../services'
import { useState, useEffect } from 'react'
import { TableRowLoading } from '../../../components/loading'
import { Role, RoutesPrivadas, formatARS } from '../../../utils'
import { useSelector } from 'react-redux'
import '../../../styles/pages/pagesEnComun.css'

const Productos = () => {
    const userState = useSelector((state) => state.user)
    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

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
            const { content: productos, error } = await fetchDataPaginatedService(
                { entity: 'producto', paginate, options }
            )
            if (error) {
                console.error(error)
            } else {
                setProductos(productos)
                setLoading(false)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const { termino,
        elementosFiltrados,
        listar,
        handleSearch,
        reset
    } = useSearchDinamic(productos, ['nombre']);

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('Productos', 'url');

    return (
        <div className='borLayout contProductos'>
            <h4 className='tituloLayout'>Productos</h4>

            {mostrarDialogo &&
                <div className='cuadroMensaje'>
                    <h4 className='dialogo'>¿Esta seguro que desea eliminar el producto
                        de forma permanente?</h4>
                    <div>
                        <button onClick={() => setDeseaBorrar(true)} className='si'>Si</button>
                        <button onClick={() => setMostrarDialogo(false)} className='no' defaultChecked>No</button>
                    </div>
                </div>
            }

            <div className='contBusquedaYNvo'>
                <div className='search'>
                    <img className='lupita' src="/icons-app/lupita.png" alt="lupita" />
                    <input
                        name='search'
                        className='inputFiltro'
                        type="text"
                        placeholder='Buscar por nombre'
                        value={termino}
                        onChange={handleSearch}
                    />
                </div>
                <div>
                    {(userState.role === Role.ADMIN) &&
                        <Link
                            className='btnNuevo'
                            to={RoutesPrivadas.NUEVO}
                        >
                            Nuevo Producto
                        </Link>
                    }
                </div>
            </div>

            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {loading ?
                        <TableRowLoading
                            cantFilas={4}
                            cantTd={4}
                            props={{ width: '95%', height: '18px', margin: '10px 0' }}
                        />
                        :
                        elementosFiltrados &&
                        elementosFiltrados.map((p) => {
                            return (
                                <tr className='trComprador colorParImpar' key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.categoria.nombre}</td>
                                    <td >{formatARS(p.precio)}</td>
                                    <td className='tdFlex'>
                                        <Link title='detalle' to={`${RoutesPrivadas.DETALLE}/${p.id}`}>
                                            <img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' />
                                        </Link>
                                        {(userState.role === Role.ADMIN) &&
                                            <>
                                                <Link title='editar' to={`${RoutesPrivadas.EDITAR}/${p.id}`}>
                                                    <img className='editar' src='/icons-app/lapiz.png' alt='editar' />
                                                </Link>
                                                <button onClick={() => iniciarEliminacion(p.id)} title='borrar' to={'/productos/' + p.id}>
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

export default Productos