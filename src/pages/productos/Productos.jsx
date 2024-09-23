import { Link } from 'react-router-dom'
import { useEliminar } from '../../hooks/index'
import { fetchDataPaginatedService } from '../../services/apiService'
import '../../styles/pages/pagesEnComun.css'
import { useState, useEffect } from 'react'

export const Productos = () => {

    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate] = useState(paginateInit)
    const [productos, setProductos] = useState([])

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
                console.log(error)
            } else {
                setProductos(productos)
            }
        }
        fetchInfo()

        return () => abortController.abort()
    }, [])

    const {
        mostrarDialogo,
        iniciarEliminacion,
        setDeseaBorrar,
        setMostrarDialogo
    } = useEliminar('Productos', 'url');

    return (
        <div className='contProductos borLayout'>
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
                    <input name='search' className='inputFiltro' type="text" />
                </div>
                <div>
                    <Link className='btnNuevo' to={'/nuevo-producto'}>Nuevo Producto</Link>
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
                    {productos && productos.map((p) => {
                        return (
                            <tr className='trComprador' key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.categoria.nombre}</td>
                                <td >$ {p.precio}</td>
                                <td className='tdFlex'>
                                    <Link title='detalle' to={'/detalle-producto/' + p.id}><img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' /></Link>
                                    <Link title='editar' to={'/editar-producto/' + p.id}><img className='editar' src='/icons-app/lapiz.png' alt='editar' /></Link>
                                    <button onClick={() => iniciarEliminacion(p.id)} title='borrar' to={'/productos/' + p.id}><img className='borrar' src='/icons-app/basurero.png' alt='borrar' /></button>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>

        </div>
    )
}
