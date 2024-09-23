import { Link } from 'react-router-dom'
import { useEliminar } from '../../hooks/index'
import { fetchDataPaginatedService } from '../../services/apiService'
import { useEffect, useState } from 'react'
import '../../styles/pages/pagesEnComun.css'


export const Facturas = () => {
    const paginateInit = { page: 0, size: 20 }
    const [paginate, setPaginate ] = useState(paginateInit)    
    const [facturas, setFacturas] = useState([])

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
                console.log(error)
            } else {
                setFacturas(facturas)
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
    } = useEliminar('Factura', 'url');

    return (
        <div className='contFacturas borLayout'>
            <h4 className='tituloLayout'>Facturas</h4>

            {mostrarDialogo &&
                <div className='cuadroMensaje'>
                    <h4 className='dialogo'>¿Esta seguro que desea eliminar la factura
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
                    <Link className='btnNuevo' to={'/nueva-factura'}>Nueva Venta</Link>
                </div>
            </div>

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
                    {facturas && facturas.map((f) => {
                        return (
                            <tr className='trComprador' key={f.id}>
                                <td>{f.cliente.nombre + ' ' + f.cliente.apellido}</td>
                                <td>{f.fechaHora.split(' ')[0]}</td>
                                <td >$ {f.total}</td>
                                <td className='tdFlex'>
                                    <Link title='detalle' to={'/detalle-factura/' + f.id}><img className='detalle' src='/icons-app/ojo.png' alt='ver detalle' /></Link>
                                    <Link title='editar' to={'/editar-factura/' + f.id}><img className='editar' src='/icons-app/lapiz.png' alt='editar' /></Link>
                                    <button onClick={() => iniciarEliminacion(f.id)} title='borrar' to={'/facturas/' + f.id}><img className='borrar' src='/icons-app/basurero.png' alt='borrar' /></button>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>

        </div>
    )
}
