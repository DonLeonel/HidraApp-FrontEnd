import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../../hooks'
import { fetchDataPaginatedService, fetchDataService } from '../../../services'
import { useEffect, useState, useRef } from 'react'
import { BoxBarrios } from '../../../components'
import { TableRowLoading } from '../../../components/loading'
import { useSelector } from 'react-redux'
import { Role, RoutesPrivadas } from '../../../utils'
import '../../../styles/pages/pagesEnComun.css'

const Clientes = () => {
    const userState = useSelector((state) => state.user)

    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate] = useState(paginateInit)

    const [loading, setLoading] = useState(true)
    const [clientes, setClientes] = useState([])
    const [idBarrio, setIdBarrio] = useState(null)
    const [btnGuardarOrder, setBtnGuardarOrder] = useState(false)
    const [listaOrdenada, setListaOrdenada] = useState({})

    const { termino,
        elementosFiltrados,
        listar,
        handleSearch,
        reset
    } = useSearchDinamic(clientes, ['nombre', 'apellido']);

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        if (!idBarrio) {
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
                    console.error(error)
                } else {
                    setClientes(clientes)
                    setLoading(false)
                }
            }
            fetchInfo()
        } else {
            const options = {
                signal
            }
            const fetchInfo = async () => {
                const { data: clientes, error } = await fetchDataService(
                    { entity: `cliente/por-barrio/${idBarrio}`, options }
                )
                if (error) {
                    console.error(error)
                } else {
                    setClientes(clientes)
                    setLoading(false)
                }
            }
            fetchInfo()
        }

        return () => abortController.abort()
    }, [paginate, idBarrio])

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('Cliente', 'url');

    const dragCliente = useRef(0)
    const draggedOverClient = useRef(0)
    const handleSort = () => {
        setBtnGuardarOrder(true)
        // Clonar la lista de clientes
        const clientesClone = [...elementosFiltrados]
        // 1. Eliminar el cliente arrastrado de su posición original
        const draggedClient = clientesClone.splice(dragCliente.current, 1)[0]
        // 2. Insertar el cliente en la posición de destino
        clientesClone.splice(draggedOverClient.current, 0, draggedClient)
        // 3. Actualizar el estado de clientes en la UI
        setClientes(clientesClone)
        // 4. Actualizar listaOrdenada con los nuevos índices de orden
        setListaOrdenada(() => {
            const nuevaListaOrdenada = {}
            // Asignar un `indiceOrder` secuencial comenzando desde 0
            clientesClone.forEach((cliente, index) => {
                nuevaListaOrdenada[cliente.id] = index
            })
            return nuevaListaOrdenada
        })
    }

    const cancelarOrden = () => {
        setBtnGuardarOrder(false)
        setListaOrdenada({})
    }

    const hanleSaveOrder = async (e) => {
        e.preventDefault();
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listaOrdenada)
        }
        await fetchDataService({ entity: 'cliente', options })
        setBtnGuardarOrder(false)
    }

    return (
        <div className='contClientes borLayout'>
            <h4 className='tituloLayout'>Clientes</h4>

            {mostrarDialogo &&
                <div className='cuadroMensaje'>
                    <h4 className='dialogo'>¿Esta seguro que desea eliminar al cliente
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
                        className='inputFiltro'
                        name='search'
                        type="text"
                        placeholder='Ingrese nombre o apellido'
                        value={termino}
                        onChange={handleSearch}
                    />
                </div>
                <div>
                    <Link
                        className='btnNuevo'
                        to={RoutesPrivadas.NUEVO}
                    >
                        Nuevo Cliente
                    </Link>
                </div>
            </div>

            <BoxBarrios
                setIdBarrios={setIdBarrio}
            />

            {btnGuardarOrder &&
                <div className='contBtnOrderCliente'>
                    <button className='guardar' onClick={hanleSaveOrder}>Guardar Orden</button>
                    <button className='cancelar' onClick={cancelarOrden}>Cancelar</button>
                </div>
            }

            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Nombre/Apellido</th>
                        <th>Añadir Venta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {loading ?
                        <TableRowLoading
                            cantFilas={10}
                            cantTd={3}
                            props={{ width: '95%', height: '18px', margin: '10px 0' }}
                        />
                        :
                        elementosFiltrados &&
                        elementosFiltrados.map((c, i) => {
                            return (
                                <tr
                                    className='trComprador colorParImpar'
                                    key={c.id}
                                    draggable
                                    onDragStart={() => (dragCliente.current = i)}
                                    onDragEnter={() => (draggedOverClient.current = i)}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <td>{c.nombre + ' ' + c.apellido}</td>
                                    <td className='tdNuevaVenta'>
                                        <Link
                                            title='nueva venta'
                                            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.NUEVO}/${RoutesPrivadas.CLIENTES}/${c.id}`}
                                        >
                                            <img className='detalle' src='/icons-app/plusGreen.png' alt='' />
                                        </Link>
                                    </td>
                                    <td className='tdFlex'>
                                        <Link
                                            title='detalle'
                                            to={`${RoutesPrivadas.DETALLE}/${c.id}`}
                                        >
                                            <img className='detalle' src='/icons-app/ojo.png' alt='' />
                                        </Link>
                                        {(userState.role === Role.ADMIN) &&
                                            <>
                                                <Link
                                                    title='editar'
                                                    to={`${RoutesPrivadas.EDITAR}/${c.id}`}
                                                >
                                                    <img className='editar' src='/icons-app/lapiz.png' alt='' />
                                                </Link>
                                                <button onClick={() => iniciarEliminacion(c.id)} title='borrar' to={'/clientes/' + c.id}>
                                                    <img className='borrar' src='/icons-app/basurero.png' alt='' />
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Clientes