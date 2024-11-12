import { Link } from "react-router-dom"
import { BusquedaYNuevo, CuadroMensajeEliminar, TableRowLoading } from "../../../components"
import { Role, RoutesPrivadas } from "../../../utils"
import { fetchDataService } from "../../../services"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useEliminar, useSearchDinamic } from "../../../hooks"
import '../../../styles/pages/pagesEnComun.css'

const Barrios = () => {
    const userState = useSelector((state) => state.user)
    const [barrios, setBarrios] = useState([])
    const [recargar, setRecargar] = useState(false)
    const [loading, setLoading] = useState(true)

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
    }, [recargar])

    const { termino,
        elementosFiltrados,
        listar,
        handleSearch,
        reset
    } = useSearchDinamic(barrios, ['nombre'])

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('barrio', { setRecargar })
    return (
        <div className='contBarrios borLayout'>
            <h4 className='tituloLayout'>Barrios</h4>

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
                textButton={'Nuevo Barrio'}
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
                    {loading ?
                        <TableRowLoading
                            cantFilas={10}
                            cantTd={3}
                            props={{ width: '95%', height: '15px', margin: '10px 0' }}
                        />
                        :
                        elementosFiltrados && elementosFiltrados.map((b) => {
                            return (
                                <tr className='trComprador colorParImpar' key={b.id}>
                                    <td>{b.nombre}</td>
                                    <td>{b.descripcion}</td>
                                    {(userState.role === Role.ADMIN) &&
                                        <td className='tdFlex'>
                                            <Link title='editar' to={`${RoutesPrivadas.EDITAR}/${b.id}`}>
                                                <img className='editar' src='/icons-app/lapiz.png' alt='' />
                                            </Link>
                                            <button onClick={() => iniciarEliminacion(b.id)} title='borrar'>
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

export default Barrios