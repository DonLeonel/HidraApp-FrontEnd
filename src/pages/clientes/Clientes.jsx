import { Link } from 'react-router-dom'
import { useEliminar, useSearchDinamic } from '../../hooks/index'
import { fetchDataPaginatedService, fetchDataService } from '../../services/apiService'
import '../../styles/pages/pagesEnComun.css'
import { useEffect, useState } from 'react'
import { BoxBarrios } from '../../components'

export const Clientes = () => {

    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate] = useState(paginateInit)

    const [clientes, setClientes] = useState([])
    const [idBarrio, setIdBarrio] = useState(null)

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
                error ? console.error(error) : setClientes(clientes)
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
                error ? console.error(error) : setClientes(clientes)
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
                    <Link className='btnNuevo' to={'/nuevo-cliente'}>Nuevo Cliente</Link>
                </div>
            </div>

            <BoxBarrios
                setIdBarrios={setIdBarrio}
            />

            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Nombre/Apellido</th>
                        <th>Añadir Venta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {elementosFiltrados &&
                        elementosFiltrados.map((c) => {
                            return (
                                <tr className='trComprador colorParImpar' key={c.id}>
                                    <td>{c.nombre + ' ' + c.apellido}</td>
                                    <td className='tdNuevaVenta'>
                                        <Link title='nueva venta' to={'/nueva-factura/cliente/' + c.id}><img className='detalle' src='/icons-app/plusGreen.png' alt='' /></Link>
                                    </td>
                                    <td className='tdFlex'>
                                        <Link title='detalle' to={'/detalle-cliente/' + c.id}><img className='detalle' src='/icons-app/ojo.png' alt='' /></Link>
                                        <Link title='editar' to={'/editar-cliente/' + c.id}><img className='editar' src='/icons-app/lapiz.png' alt='' /></Link>
                                        <button onClick={() => iniciarEliminacion(c.id)} title='borrar' to={'/clientes/' + c.id}><img className='borrar' src='/icons-app/basurero.png' alt='' /></button>
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
