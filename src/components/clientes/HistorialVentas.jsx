import { useState, useEffect } from "react"
import { fetchDataService } from "../../services"
import { ButtonVerOcultar } from "../buttons"
import { VentaHistorial } from "../ventas"
import { ButtonCrearFactura } from "../facturas/ButtonCrearFactura"
import '../../styles/components/ventas/historialVentas.css'

export const HistorialVentas = ({ cliente }) => {

    const [mostrarHistorial, setMostrarHistorial] = useState(false)
    const [ventas, setVentas] = useState([])
    const [facturaACrear, setFacturaACrear] = useState(null);
    const [ventasAFacturar, setVentasAFacturar] = useState([]);

    const handlerHistorialVentas = () => {
        setMostrarHistorial(!mostrarHistorial)
    }

    const manejarSeleccion = (venta, isChecked) => {
        if (isChecked) {
            setVentasAFacturar((prev) => [...prev, venta])       
        } else {
            setVentasAFacturar((prev) => prev.filter((v) => v.id !== venta.id))            
        }                   
    }

    useEffect(() => {
        setFacturaACrear({
            cliente,
            ventasAFacturar
        }) 
    }, [ventasAFacturar])

    useEffect(() => {
        if (mostrarHistorial && ventas.length == 0) {
            const abortController = new AbortController()
            const { signal } = abortController

            const options = {
                signal
            }
            const fetchInfo = async () => {
                const { data: ventas, error } = await fetchDataService(
                    { entity: `venta/por-cliente/${cliente.id}`, options }
                )
                error ? console.error(error) : setVentas(ventas)
            }
            fetchInfo()           
            return () => abortController.abort()
        }
    }, [mostrarHistorial])
    
    return (
        <>
            <div className='contButtonVerOcultar'>
                <ButtonVerOcultar
                    text={'Historial de Ventas'}
                    handleVerOcultar={handlerHistorialVentas}
                    ver={mostrarHistorial}
                />
            </div>

            {(ventasAFacturar.length > 0) &&
                <div className="contVentasSelecc">
                    <h5>Ventas seleccionadas para facturar</h5>
                    <ul className="ventasAFacturar">
                        {ventasAFacturar.map(v => {
                            return (
                                <li key={v.id}>{v.id}</li>
                            )
                        })}
                    </ul>

                    <ButtonCrearFactura
                        facturaACrear={facturaACrear}
                    />
                </div>
            }

            <div className='contHistorial'>
                {
                    mostrarHistorial &&
                    ventas.sort((a, b) => {                        
                            // Ubicar las ventas con estado "VENCIDO" al inicio
                            if (a.estado === "VENCIDO" && b.estado !== "VENCIDO") return -1
                            if (b.estado === "VENCIDO" && a.estado !== "VENCIDO") return 1
                        
                            // Ubicar las ventas con estado "FACTURADA" antes que "PAGADO"
                            if (a.estado === "FACTURADA" && b.estado === "PAGADO") return -1
                            if (b.estado === "FACTURADA" && a.estado === "PAGADO") return 1
                        
                            // Ubicar las ventas con estado "PAGADO" al final
                            if (a.estado === "PAGADO" && b.estado !== "PAGADO") return 1
                            if (b.estado === "PAGADO" && a.estado !== "PAGADO") return -1
                        
                            // Si los estados son iguales o ninguno es "VENCIDO", "FACTURADA" o "PAGADO", ordenar por fecha
                            return new Date(b.fechaHora) - new Date(a.fechaHora);
                    }).map(v => {
                            return (
                                <VentaHistorial
                                    key={v.id}
                                    venta={v}
                                    onSeleccionar={manejarSeleccion}
                                />
                            )
                        })
                }
            </div>
        </>
    )
}