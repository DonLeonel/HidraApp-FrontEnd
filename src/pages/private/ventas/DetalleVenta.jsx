import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchDataService } from '../../../services'
import { Role, formatARS, getClassNameEstado } from '../../../utils'
import { useSelector } from 'react-redux'
import { ButtonVolver, Loading } from '../../../components'
import '../../../styles/pages/detalleVenta.css'

const DetalleVenta = () => {

    const userState = useSelector((state) => state.user)
    const { id } = useParams()
    const [venta, setVenta] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: venta, error } = await fetchDataService(
                { entity: 'venta', id, options }
            )
            if (error) console.error(error)
            else {
                setVenta(venta)
                setLoading(false)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    return (
        <div className='contDetalleVenta borLayout'>
            <h4 className='tituloLayout'>Detalle venta</h4>
            {loading ?
                <>
                    <Loading
                        width={'98%'}
                        height={'30%'}
                        margin={'1rem auto'}
                    />
                    <Loading
                        width={'98%'}
                        height={'23%'}
                        margin={'1rem auto'}
                    />
                </> :
                venta &&
                <>
                    <div className='boxDetalles'>
                        <div className='infoFactura'>
                            <h4>Id venta: <span>{venta.id}</span></h4>
                            <h4>Fecha/Hora: <span className='fechaHora'><br />{venta.fechaHora}</span></h4>
                            <h4>Forma de pago: <span><br />{venta.formaDePago.nombre}</span></h4>
                            <h4>Estado: <span className={getClassNameEstado(venta.estado)}><br />{venta.estado}</span>
                            </h4>
                            {
                                venta.updatedAt && (userState.role === Role.ADMIN) &&
                                <h4>Actualizacion: <span className='fechaHora'><br />{venta.updatedAt}</span></h4>
                            }
                        </div>
                        <div className='cliente'>
                            <h4>Nombre: <span>{venta.cliente.nombre}</span></h4>
                            <h4>Apellido: <span>{venta.cliente.apellido}</span></h4>
                            <h4>Celular: <span>{venta.cliente.celular}</span></h4>
                        </div>
                    </div>

                    <div className='nota'>
                        {
                            venta.montoEntrega &&
                            <h4>
                                Entrego: <span>{formatARS(venta.montoEntrega)}</span> <br />
                                Debe: <span>{formatARS(venta.total - venta.montoEntrega)}</span>
                            </h4>
                        }
                    </div>

                    <div className='boxProductos'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venta.detallesVenta.map(d => {
                                    return (
                                        <tr key={d.id}>
                                            <td>{d.producto.nombre}</td>
                                            <td>{d.cantidad}</td>
                                            <td>{formatARS(d.subTotal)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <hr />
                        <div className='total'>
                            <h4>Total: {formatARS(venta.total)}</h4>
                        </div>
                    </div>
                </>
            }
            <div className='contButtonVolver'>
                <ButtonVolver />
            </div>
        </div>
    )
}

export default DetalleVenta