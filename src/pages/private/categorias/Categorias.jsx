import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../../hooks'
import { fetchDataService } from '../../../services'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Role, RoutesPrivadas } from '../../../utils'
import { CuadroMensajeEliminar, BusquedaYNuevo } from '../../../components'
import '../../../styles/pages/pagesEnComun.css'

const Categorias = () => {

    const userState = useSelector((state) => state.user)
    const [categorias, setCategorias] = useState([])
    const [recargar, setRecargar] = useState(false)

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
    }, [recargar])

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
    } = useEliminar('categoria', { setRecargar });

    return (
        <div className='contCategorias borLayout'>
            <h4 className='tituloLayout'>Categorias</h4>

            {mostrarDialogo &&
                <CuadroMensajeEliminar
                    entidad={'Categoria'}
                    setDeseaBorrar={setDeseaBorrar}
                    setMostrarDialogo={setMostrarDialogo}
                />
            }

            <BusquedaYNuevo
                placeholder={'Buscar por nombre'}
                termino={termino}
                handleSearch={handleSearch}
                textButton={'Nueva Categoria'}
            />

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
                                        <button onClick={() => iniciarEliminacion(c.id)} title='borrar'>
                                            <img className='borrar' src='/icons-app/basurero.png' alt='borrar' />
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