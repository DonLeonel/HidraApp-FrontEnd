import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../../styles/pages/detalleFactura.css'
import { fetchDataService } from '../../services/apiService'
import { formatARS } from '../../utils/formatoPrecios'
import { getClassName } from '../../utils/EstadosFactura'

export const DetalleFactura = () => {

    const { id } = useParams()
    const [factura, setFactura] = useState(null)

    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1); // Esto te lleva a la página anterior
    };

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: factura, error } = await fetchDataService(
                { entity: 'factura', id, options }
            )
            error ? console.error(error) : setFactura(factura)
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    return (
        <div className='contDetalleFactura borLayout'>
            <h4 className='tituloLayout'>Detalle factura</h4>
            {
                factura &&
                <>
                    <div className='boxDetalles'>
                        <div className='infoFactura'>
                            <h4>Núm de factura: <span>{factura.id}</span></h4>
                            <h4>Fecha/Hora: <span className='fechaHora'>{factura.fechaHora}</span></h4>
                            <h4>Forma de pago: <span>{factura.formaDePago.nombre}</span></h4>
                            <h4>Estado: <span className={getClassName(factura.estado)}>{factura.estado}</span>
                            </h4>
                            {
                                factura.updatedAt && <h4>Actualizacion: <span className='fechaHora'>{factura.updatedAt}</span></h4>
                            }
                        </div>
                        <div className='cliente'>
                            <h4>Nombre: <span>{factura.cliente.nombre}</span></h4>
                            <h4>Apellido: <span>{factura.cliente.apellido}</span></h4>
                            <h4>Celular: <span>{factura.cliente.celular}</span></h4>
                        </div>
                    </div>

                    <div className='nota'>
                        {
                            factura.entrega &&
                            <h4>
                                Entrego: <span>{formatARS(factura.entrega)}</span>,  Debe: <span>{formatARS(factura.total - factura.entrega)}</span>
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
                                {factura.detallesFactura.map(d => {
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
                            <h4>Total: {formatARS(factura.total)}</h4>
                        </div>
                    </div>
                </>
            }

            <div className='contBtn contEntradas'>
                <button onClick={handleBack} className='btnVolver' >Volver</button>
            </div>
        </div>
    )
}