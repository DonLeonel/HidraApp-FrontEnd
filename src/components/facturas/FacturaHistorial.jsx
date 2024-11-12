import { formatARS, getClassNameEstado, Role } from "../../utils"
import { useSelector } from "react-redux"
import '../../styles/components/facturas/facturaHistorial.css'

export const FacturaHistorial = ({ f }) => {

    const userState = useSelector((state) => state.user)

    return (
        <div className='factura'>
            <div className='boxDetalles'>
                <h4>Núm de factura: <span>{f.id}</span></h4>
                <h4>Fecha/Hora: <span className='fechaHora'>{f.fechaHora}</span></h4>
                <h4>Forma de pago: <span>{f.formaDePago.nombre.toUpperCase()}</span></h4>
                <h4>Estado: <span className={getClassNameEstado(f.estado)}>{f.estado.toUpperCase()}</span></h4>
                {
                    f.updatedAt && userState.role == Role.ADMIN &&
                    <h4>Actualizacion: <span>{f.updatedAt}</span></h4>
                }
                {
                    f.entrega &&
                    <>
                        <h4>Entrego: <span>{formatARS(f.entrega)}</span></h4>
                        <h4>Debe: <span>{formatARS(f.total - f.entrega)}</span></h4>
                    </>
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
                        {f.detallesFactura.map(d => {
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
                    <h4>Total: {formatARS(f.total)}</h4>
                </div>
            </div>
        </div>
    )
}