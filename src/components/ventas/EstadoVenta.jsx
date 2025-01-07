import { useState, useEffect } from "react"
import '../../styles/components/ventas/formaPagoYEstadoVenta.css'

export const EstadoVenta = ({ estados, estadoVenta,
    setEstadoVenta, montoEntrega, setMontoEntrega, onChange = null }) => {

    const [habilitarEntrega, setHabilitarEntrega] = useState(false)

    useEffect(() => {
        if (estadoVenta == 'PARCIALMENTE_PAGADO') {
            setHabilitarEntrega(true)
            if (!montoEntrega) setMontoEntrega('')
        } else {
            setHabilitarEntrega(false)
            setMontoEntrega(null)
        }
        estadoVenta && onChange && onChange()
    }, [estadoVenta, montoEntrega])

    return (
        <div className='contEstadoVenta'>
            <h4 className="tituloComponent">Seleccione un estado.</h4>
            <form>
                <select
                    className='selectEstadoVenta'
                    name="estadoVenta" id="estadoVenta"
                    onChange={({ target }) => setEstadoVenta(target.value)}
                    value={estadoVenta}
                >
                    {
                        estados?.map((e, i) => {
                            return (
                                <option key={i} value={e}>
                                    {e}
                                </option>
                            )
                        })
                    }
                </select>

                {habilitarEntrega &&
                    <input
                        onChange={({ target }) => setMontoEntrega(target.value)}
                        placeholder="Monto de entrega"
                        value={montoEntrega}
                        type="number"
                        name="montoEntrega"
                        id="montoEntrega"
                    >
                    </input>
                }
            </form>
        </div>
    )
}
