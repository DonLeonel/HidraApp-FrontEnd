import { Link, useParams } from 'react-router-dom'
import { fetchDataService } from '../../services/apiService'
import { Cargando } from '../../components/Cargando'
import { useState, useEffect } from 'react'
import '../../styles/pages/detalleCliente.css'


export const DetalleCliente = () => {

    const { id } = useParams()
    const [cliente, setCliente] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: cliente, error } = await fetchDataService(
                { entity: 'cliente', id, options }
            )
            error ? console.error(error) : setCliente(cliente)
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    return (
        <div className='contDetalleCliente borLayout'>
            <h4 className='tituloLayout'>Detalle Cliente</h4>

            {
                cliente &&
                <>
                    <div className='datosCliente'>
                        <div className='detalles'>
                            <h4>Id: <span>{cliente.id}</span></h4>
                            <h4>Nombre: <span>{cliente.nombre}</span></h4>
                            <h4>Apellido: <span>{cliente.apellido}</span></h4>
                        </div>
                        <div className='detalles'>
                            <h4>Celular: <span>{cliente.celular}</span></h4>
                            <h4>Cant. Compras: <span>{cliente.cantCompras}</span></h4>
                            {
                                cliente.updatedAt && <h4>Actualizado: <span className='fechaHora'>{cliente.updatedAt}</span></h4>
                            }
                        </div>
                    </div>
                    {
                        cliente && cliente.contacto &&
                        <div className='datoContacto'>
                            <h4>Direccion: <span>{cliente.contacto.direccion}</span></h4>
                            <h4>Localidad: <span>{cliente.contacto.localidad}</span></h4>
                        </div>
                    }
                </>
            }

            <div className='contBtn contEntradas'>
                <Link className='btnVolver' to={'/clientes'}>Volver</Link>
            </div>
        </div>
    )
}