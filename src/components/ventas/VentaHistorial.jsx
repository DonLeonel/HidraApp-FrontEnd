import { formatARS, getClassNameEstado, Role } from "../../utils"
import { useSelector } from "react-redux"
import '../../styles/components/ventas/ventaHistorial.css'

export const VentaHistorial = ({ venta, onSeleccionar = null }) => {

    const userState = useSelector((state) => state.user)   

    const manejarCambioCheckbox = (e) => {
        onSeleccionar(venta, e.target.checked);
    }

    return (
        <div className='ventaHistorial'>
            <div className='boxDetalles'>
                {
                    onSeleccionar != null &&
                    venta.estado !== 'PAGADO' && venta.estado !== 'FACTURADA' &&
                    <input className="checkbox"
                        type="checkbox"
                        name="checkbox"
                        id="checkbox"
                        onChange={manejarCambioCheckbox}
                    />
                }

                <h4>Núm de Venta: <span>{venta.id}</span></h4>
                <h4>Fecha/Hora: <span className='fechaHora'>{venta.fechaHora}</span></h4>
                {
                    venta.formaDePago &&
                    <h4>Forma de pago: <span>{venta.formaDePago.nombre.toUpperCase()}</span></h4>
                }
                <h4>Estado: <span className={getClassNameEstado(venta.estado)}>{venta.estado.toUpperCase()}</span></h4>
                {
                    venta.fechaFacturada &&
                    <h4>Fecha Facturación: <span className='fechaHora'>{venta.fechaFacturada}</span></h4>
                }
                {
                    venta.updatedAt && userState.role == Role.ADMIN &&
                    <h4>Actualizacion: <span>{venta.updatedAt}</span></h4>
                }
                {
                    venta.entrega &&
                    <>
                        <h4>Entrego: <span>{formatARS(venta.entrega)}</span></h4>
                        <h4>Debe: <span>{formatARS(venta.total - venta.entrega)}</span></h4>
                    </>
                }
            </div>
            <hr />
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
        </div>
    )
}