import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../../styles/pages/detalleFactura.css'
import { fetchDataService } from '../../services/apiService'


export const DetalleFactura = () => {

    const { id } = useParams()
    const [factura, setFactura] = useState(null)

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
            if (error) {
                console.log(error)
            } else {
                setFactura(factura)
            }
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
                            <h4>Codigo: <span>{factura.id}</span></h4>
                            <h4>Fecha/Hora: <span>{factura.fechaHora}</span></h4>
                            <h4>Forma de pago: <span>{factura.formaDePago.nombre}</span></h4>
                            {
                                factura.updatedAt && <h4>Actualizacion: <span>{factura.updatedAt}</span></h4>
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
                                            <td>$ {d.subTotal}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <hr />
                        <div className='total'>
                            <h4>Total: $ {factura.total}</h4>
                        </div>
                    </div>
                </>
            }

            <div className='contBtn contEntradas'>
                <Link className='btnVolver' to={'/facturas'}>Volver</Link>
            </div>
        </div>
    )
}