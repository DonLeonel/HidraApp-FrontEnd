import { useParams } from 'react-router-dom'
import { fetchDataService } from '../../../services'
import { useState, useEffect } from 'react'
import { formatARS, Role } from '../../../utils'
import { BoxRecaudacion, ButtonVerOcultar, ButtonVolver,
     FacturaHistorial, Loading, AbonoDeCuenta } from '../../../components'
import { useSelector } from 'react-redux'
import '../../../styles/pages/detalles.css'

const DetalleCliente = () => {

    const userState = useSelector((state) => state.user)
    const { id } = useParams()
    const [cliente, setCliente] = useState(null)
    const [facturas, setFacturas] = useState([])
    const [cuenta, setCuenta] = useState(null)
    const [mostrarHistorial, setMostrarHistorial] = useState(false)
    const [mostrarCuenta, setMostrarCuenta] = useState(false)
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

    useEffect(() => {
        if (mostrarCuenta) {
            const abortController = new AbortController()
            const { signal } = abortController

            const options = {
                signal
            }
            const fetchInfo = async () => {
                const { data: cuenta, error } = await fetchDataService(
                    { entity: `cliente/obtener-cuenta/${cliente.id}`, options }
                )
                error ? console.error(error) : setCuenta(cuenta)
            }
            fetchInfo()
            return () => abortController.abort()
        }
    }, [mostrarCuenta])

    const handleHistorial = () => {
        mostrarHistorial ?
            setMostrarHistorial(false)
            : setMostrarHistorial(true)
    }

    const handleCuenta = () => {
        mostrarCuenta ?
            setMostrarCuenta(false)
            : setMostrarCuenta(true)
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
                                text={'Cuenta'}
                                handleVerOcultar={handleCuenta}
                                ver={mostrarCuenta}
                            />
                        </div>
                    }

                    <div className='contDetCuenta'>
                        {mostrarCuenta &&
                            <>
                                <section className='contTotales'>
                                    <BoxRecaudacion nombre={'Total en Cheques'} total={formatARS(cuenta?.totalCheque)} />
                                    <BoxRecaudacion nombre={'Total en Contado'} total={formatARS(cuenta?.totalContado)} />
                                    <BoxRecaudacion nombre={'Total en Credito'} total={formatARS(cuenta?.totalCredito)} />
                                    <BoxRecaudacion nombre={'Total en Fiado'} total={formatARS(cuenta?.totalFiado)} />
                                    <BoxRecaudacion nombre={'Total en Transferencias'} total={formatARS(cuenta?.totalTransferencia)} />
                                </section>
                                <hr />
                                <div className='total'>
                                    <h4>Total: <span>{formatARS(cuenta?.total)}</span></h4>
                                    <h5>(No incluye ventas pagadas)</h5>
                                </div>
                                <AbonoDeCuenta />
                            </>
                        }
                    </div>

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