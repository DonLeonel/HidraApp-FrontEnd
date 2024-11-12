import { useParams } from 'react-router-dom'
import { fetchDataService } from '../../../services'
import { useState, useEffect } from 'react'
import { Role } from '../../../utils'
import { ButtonVerOcultar, ButtonVolver, FacturaHistorial, Loading, TableRowLoading } from '../../../components'
import { useSelector } from 'react-redux'
import '../../../styles/pages/detalles.css'

const DetalleCliente = () => {

    const userState = useSelector((state) => state.user)
    const { id } = useParams()
    const [cliente, setCliente] = useState(null)
    const [facturas, setFacturas] = useState([])
    const [mostrarHistorial, setMostrarHistorial] = useState(false)
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

    useEffect(() => {
        if (mostrarHistorial) {
            const abortController = new AbortController()
            const { signal } = abortController

            const options = {
                signal
            }
            const fetchInfo = async () => {
                const { data: facturas, error } = await fetchDataService(
                    { entity: `factura/por-cliente/${cliente.id}`, options }
                )
                error ? console.error(error) : setFacturas(facturas)
            }
            fetchInfo()
            return () => abortController.abort()
        }
    }, [mostrarHistorial])

    const handleHistorial = () => {
        mostrarHistorial ?
            setMostrarHistorial(false)
            : setMostrarHistorial(true)
    }

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

                    {cliente.cantCompras > 0 &&
                        <div className='contButtonVerOcultar'>
                            <ButtonVerOcultar
                                text={'Historial'}
                                handleVerOcultar={handleHistorial}
                                ver={mostrarHistorial}
                            />
                        </div>
                    }

                    <div className='contHistorial'>
                        {
                            mostrarHistorial &&
                            facturas.map(f => {
                                return (
                                    <FacturaHistorial
                                        key={f.id}
                                        f={f}
                                    />
                                )
                            })
                        }
                    </div>
                </>
            }
            <div className='contButtonVolver'>
                <ButtonVolver />
            </div>
        </div>
    )
}

export default DetalleCliente