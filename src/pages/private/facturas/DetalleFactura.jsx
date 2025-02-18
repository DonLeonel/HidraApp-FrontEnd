import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchDataService } from '../../../services'
import { Role, formatARS, formatoDetallesFacturas, getClassNameEstado } from '../../../utils'
import { ButtonGenerarPdf, ButtonVolver, Loading, VentaHistorial } from '../../../components'
import { useSelector } from 'react-redux'
import '../../../styles/pages/pagesEnComun.css'
import '../../../styles/pages/facturas/detalleFactura.css'
import '../../../styles/components/buttons/buttons.css'

const DetalleFactura = () => {

    const userState = useSelector((state) => state.user)
    const { id } = useParams()
    const [factura, setFactura] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mostrarVentasAsoc, setMostrarVentasAsoc] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: venta, error } = await fetchDataService(
                { entity: 'factura', id, options }
            )
            if (error) console.error(error)
            else {
                setFactura(venta)
                setLoading(false)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const handlerMostrarVentasAsoc = () => {
        setMostrarVentasAsoc(!mostrarVentasAsoc)
    }

    return (
        <div className='contDetalleFactura borLayout'>
            <h4 className='tituloLayout'>Detalle Factura</h4>
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
                factura &&
                <>
                    <div className='boxDetalles'>
                        <div className='infoFactura'>
                            <h4>Id Factura: <span>{factura.id}</span></h4>
                            <h4>Fecha: <span className='fechaHora'><br />{factura.fechaEmision}</span></h4>
                            <h4>Estado: <span className={getClassNameEstado(factura.estado)}><br />{factura.estado}</span>
                            </h4>
                            {
                                factura.updatedAt && (userState.role === Role.ADMIN) &&
                                <h4>Actualizacion: <span className='fechaHora'><br />{factura.updatedAt}</span></h4>
                            }
                        </div>
                        <div className='cliente'>
                            <h4>Nombre: <span>{factura.cliente.nombre}</span></h4>
                            <h4>Apellido: <span>{factura.cliente.apellido}</span></h4>
                            <h4>Celular: <span>{factura.cliente.celular}</span></h4>
                        </div>
                    </div>

                    <div className='boxProductos'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Productos</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formatoDetallesFacturas(factura.detallesFactura).map(d => {
                                    return (
                                        <tr key={d.id}>
                                            <td>{d.nombre}</td>
                                            <td>{formatARS(d.precio)}</td>
                                            <td>{d.cantidad}</td>
                                            <td>{formatARS(d.subTotal)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <hr />
                        <div className='total'>
                            <h4>Total: {formatARS(factura.total)}</h4>
                        </div>
                    </div>
                </>
            }

            <div className='contBtnGenerarPDF'>
                <ButtonGenerarPdf
                    id={id}
                />
            </div>
            <div className='contMostrarVentasAsociadas'>
                <button
                    onClick={handlerMostrarVentasAsoc}
                    className='btnMostrarVentasAsociadas'
                >
                    Mostrar Ventas Asociadas
                </button>
            </div>
            <section className='contVentasAsociadas'>
                {
                    mostrarVentasAsoc &&
                    factura?.detallesFactura.map(({ venta }) => {
                        return (
                            <VentaHistorial
                                key={venta.id}
                                venta={venta}
                            />)
                    })
                }
            </section>

            <div className='contButtonVolver'>
                <ButtonVolver />
            </div>
        </div>
    )
}

export default DetalleFactura