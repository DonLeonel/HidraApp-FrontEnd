import { useState } from "react"
import { formatARS } from "../../utils"
import { ButtonVerOcultar } from "../buttons"
import { VentaHistorial } from "../ventas"
import { BoxRecaudacion } from "./BoxRecaudacion"

export const Reporte = ({ busquedaRealizada, data }) => {

    const [mostrarVentas, setMostrarVentas] = useState(false)

    const handlerVerVentas = () => {
        mostrarVentas ?
            setMostrarVentas(false)
            : setMostrarVentas(true)
    }

    return (
        <>
            {/* Mostrar mensaje solo si la búsqueda se realizó y no hay datos */}
            {busquedaRealizada && !data && <h5 className='h5'>No hay reportes coincidentes.</h5>}

            {data &&
                <div className='reporte'>
                    <hr />
                    <section className='contTotales'>
                        <BoxRecaudacion nombre={'Cant. de ventas'} total={data.ventas.length} />
                        <BoxRecaudacion nombre={'Total en Cheques'} total={formatARS(data.totalCheque)} />
                        <BoxRecaudacion nombre={'Total en Contado'} total={formatARS(data.totalContado)} />
                        <BoxRecaudacion nombre={'Total en Credito'} total={formatARS(data.totalCredito)} />
                        <BoxRecaudacion nombre={'Total en Fiado'} total={formatARS(data.totalFiado)} />
                        <BoxRecaudacion nombre={'Total en Transferencias'} total={formatARS(data.totalTransferencia)} />
                    </section>
                    <div className='total'>
                        <h4>Total: <span>{formatARS(data.total)}</span></h4>
                    </div>
                    <div className='contButtonVerOCultar'>
                        <ButtonVerOcultar
                            text={'Ventas'}
                            handleVerOcultar={handlerVerVentas}
                            ver={mostrarVentas}
                        />
                    </div>

                    <div className='contVentas'>
                        {
                            mostrarVentas &&
                            data.ventas.map(v => {
                                return (
                                    <VentaHistorial
                                        key={v.id}
                                        venta={v}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}