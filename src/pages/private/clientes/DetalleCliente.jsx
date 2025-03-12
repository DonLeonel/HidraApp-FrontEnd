import { useParams } from 'react-router-dom'
import { fetchDataService } from '../../../services'
import { useState, useEffect } from 'react'
import { Role } from '../../../utils'
import { ButtonVolver, Loading, HistorialVentas, HistorialFacturas } from '../../../components'
import { useSelector } from 'react-redux'
import '../../../styles/pages/detalles.css'

const DetalleCliente = () => {

    const userState = useSelector((state) => state.user)
    const { id } = useParams()
    const [cliente, setCliente] = useState(null)
    const [loading, setLoading] = useState(true)

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
            if (error) console.error(error)
            else {
                setCliente(cliente)
                setLoading(false)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    return (
        <div className='contDetalleCliente borLayout'>
            <h4 className='tituloLayout'>Detalle Cliente</h4>

            {loading ?
                <>
                    <Loading
                        width={'98%'}
                        height={'20%'}
                        margin={'10px auto'}
                    />
                    <Loading
                        width={'98%'}
                        height={'13%'}
                        margin={'1rem auto'}
                    />
                </> :
                cliente &&
                <>
                    <section className='datosCliente'>
                        <div className='detalles'>
                            <h4>Id: <span>{cliente.id}</span></h4>
                            <h4>Nombre: <span>{cliente.nombre}</span></h4>
                            <h4>Apellido: <span>{cliente.apellido}</span></h4>
                        </div>
                        <div className='detalles'>
                            <h4>Celular: <span>{cliente.celular}</span></h4>
                            <h4>Barrio: <span>{cliente.barrio.nombre}</span></h4>
                            <h4>Cant. Compras: <span>{cliente.cantCompras}</span></h4>
                            {
                                cliente.updatedAt && userState.role === Role.ADMIN &&
                                <h4>Actualizado: <span className='fechaHora'>{cliente.updatedAt}</span></h4>
                            }
                        </div>
                    </section>
                    {
                        cliente.ubicacion &&
                        <div className='datoUbicacion'>
                            <h4>Direccion: <span>{cliente.ubicacion.direccion}</span></h4>
                            <h4>Localidad: <span>{cliente.ubicacion.localidad}</span></h4>
                        </div>
                    }

                    <section className='historiales'>
                        {cliente.cantCompras > 0 &&
                            <HistorialFacturas
                                cliente={cliente}
                            />
                        }

                        {cliente.cantCompras > 0 &&
                            <HistorialVentas
                                cliente={cliente}
                            />
                        }
                    </section>
                </>
            }
            <div className='contButtonVolver'>
                <ButtonVolver />
            </div>
        </div>
    )
}

export default DetalleCliente