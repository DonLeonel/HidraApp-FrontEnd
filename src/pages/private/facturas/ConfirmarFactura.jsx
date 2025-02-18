import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataService } from "../../../services";
import { calcularTotal, generarDetallesFactura, obtenerFechaActual, formatARS, RoutesPrivadas } from "../../../utils";
import { useState, useEffect } from "react";
import { ButtonVolver } from "../../../components";
import '../../../styles/pages/facturas/factura.css'
import '../../../styles/pages/pagesEnComun.css'

const ConfirmarFactura = () => {

    const { state } = useLocation()
    const [cliente, setCliente] = useState(null)
    const [detallesFactura, setDetallesFactura] = useState([])
    const [fechaEmision, setFechaEmision] = useState('')
    const navigate = useNavigate();

    const handlerCrearFactura = async (e) => {
        e.preventDefault()
        if (state != undefined) {
            const facturaRQ = {
                fechaEmision,
                idCliente: cliente.id,
                idsVentas: state.ventasAFacturar.map(v => v.id)
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(facturaRQ)
            }
            const { data, error } = await fetchDataService({ entity: 'factura', options })
            if (data) {
                alert('Factura creada exitosamente')
                navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}`, { replace: true })
            }else if(error){
                console.error(error)
            }       
        }
    }

    useEffect(() => {
        setFechaEmision(obtenerFechaActual())
        if (state != undefined) {
            setDetallesFactura(generarDetallesFactura(state.ventasAFacturar))
            setCliente(state.cliente)
        }
    }, [])

    return (
        <div className="contConfirmarFactura borLayout">
            {
                state &&
                <form onSubmit={handlerCrearFactura} className='factura'>
                    <div className='boxDetalles'>
                        <div className="item">
                            <h4>Fecha emision:</h4>
                            <input onChange={({ target }) => setFechaEmision(target.value)} defaultValue={fechaEmision} type="date" name="fechaEmision" id="fechaEmision" />
                        </div>
                        <div className="item">
                            <h4>Cliente: </h4>
                            <span className="cliente">{cliente?.nombre} {cliente?.apellido}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='boxProductos'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Productos</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallesFactura?.map(d => {
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
                            <h4>Total: {formatARS(calcularTotal(detallesFactura))}</h4>
                        </div>
                    </div>

                    <div className="contButton">
                        <button className="btnCrearFactura" type="submit">Crear Factura</button>
                    </div>
                </form>
            }

            <div className="contButtonVolver">
                <ButtonVolver />
            </div>
        </div >
    )
}

export default ConfirmarFactura