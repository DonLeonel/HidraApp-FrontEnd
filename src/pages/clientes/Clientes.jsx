import { Link } from 'react-router-dom'
import { useEliminar } from '../../hooks/index'
import { fetchDataPaginatedService } from '../../services/apiService'
import '../../styles/pages/pagesEnComun.css'
import { useEffect, useState } from 'react'


export const Clientes = () => {

    const paginateInit = { page: 0, size: 20 }
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
    }, [paginate])

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
                    <input name='search' className='inputFiltro' type="text" />
                </div>
                <div>
                    <Link className='btnNuevo' to={'/nuevo-cliente'}>Nuevo Cliente</Link>
                </div>
            </div>


            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Nombre/Apellido</th>
                        <th>Celular</th>
                        <th>Compras</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {clientes && clientes.map((c) => {
                        return (
                            <tr className='trComprador' key={c.id}>
                                <td>{c.nombre + ' ' + c.apellido}</td>
                                <td>{c.celular}</td>
                                <td className='cant_compras'>{c.cantCompras}</td>
                                <td className='tdFlex'>
                                    <Link title='detalle' to={'/detalle-cliente/' + c.id}><img className='detalle' src='/icons-app/ojo.png' alt='' /></Link>
                                    <Link title='editar' to={'/editar-cliente/' + c.id}><img className='editar' src='/icons-app/lapiz.png' alt='' /></Link>
                                    <button onClick={() => iniciarEliminacion(c.id)} title='borrar' to={'/clientes/' + c.id}><img className='borrar' src='/icons-app/basurero.png' alt='' /></button>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
