import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../../hooks'
import { fetchDataService } from '../../../services'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Role, RoutesPrivadas } from '../../../utils'
import '../../../styles/pages/pagesEnComun.css'

const Categorias = () => {
    
    const userState = useSelector((state) => state.user)
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal
        }
        const fetchInfo = async () => {
            const { data: categorias, error } = await fetchDataService(
                { entity: 'categoria', options }
            )
            error ? console.error(error) : setCategorias(categorias)
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const { termino,
        elementosFiltrados,
        listar,
        handleSearch,
        reset
    } = useSearchDinamic(categorias, ['nombre']);

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('Categoria', 'url');

    return (
        <div className='contCategorias borLayout'>
            <h4 className='tituloLayout'>Categorias</h4>

            {mostrarDialogo &&
                <div className='cuadroMensaje'>
                    <h4 className='dialogo'>¿Esta seguro que desea eliminar la categoria
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
                            Nueva Categoria
                        </Link>
                    }
                </div>
            </div>

            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        {(userState.role === Role.ADMIN) &&
                            <th>Acciones</th>
                        }
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {elementosFiltrados && elementosFiltrados.map((c) => {
                        return (
                            <tr className='trComprador colorParImpar' key={c.id}>
                                <td>{c.nombre}</td>
                                <td>{c.descripcion}</td>
                                {(userState.role === Role.ADMIN) &&
                                    <td className='tdFlex'>
                                        <Link title='editar' to={`${RoutesPrivadas.EDITAR}/${c.id}`}>
                                            <img className='editar' src='/icons-app/lapiz.png' alt='' />
                                        </Link>
                                        <button onClick={() => iniciarEliminacion(c.id)} title='borrar' to={'/categorias/' + c.id}>
                                            <img className='borrar' src='/icons-app/basurero.png' alt='' />
                                        </button>
                                    </td>
                                }
                            </tr>)
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Categorias