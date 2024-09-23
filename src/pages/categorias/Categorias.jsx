import { Link } from 'react-router-dom'
import { useEliminar } from '../../hooks/index'
import { fetchDataService } from '../../services/apiService'
import { useEffect, useState } from 'react'
import '../../styles/pages/pagesEnComun.css'

export const Categorias = () => {

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

            if (error) {
                console.log(error)
            } else {
                setCategorias(categorias)
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
                    <input name='search' className='inputFiltro' type="text" />
                </div>
                <div>
                    <Link className='btnNuevo' to={'/nueva-categoria'}>Nueva Categoria</Link>
                </div>
            </div>

            <table className='tablePages'>
                <thead className='tableHeader'>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='tableBody'>
                    {categorias && categorias.map((c) => {
                        return (
                            <tr className='trComprador' key={c.id}>
                                <td>{c.nombre}</td>
                                <td>{c.descripcion}</td>
                                <td className='tdFlex'>
                                    <Link title='editar' to={'/editar-categoria/' + c.id}><img className='editar' src='/icons-app/lapiz.png' alt='' /></Link>
                                    <button onClick={() => iniciarEliminacion(c.id)} title='borrar' to={'/categorias/' + c.id}><img className='borrar' src='/icons-app/basurero.png' alt='' /></button>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>

        </div>
    )
}