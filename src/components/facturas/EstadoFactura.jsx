import { useState, useEffect } from "react"
import '../../styles/components/facturas/formaPagoYEstadoFactura.css'

export const EstadoFactura = ({ estados, estadoFactura,
    setEstadoFactura, entrega, setEntrega, onChange = null }) => {

    const [habilitarEntrega, setHabilitarEntrega] = useState(false)

    useEffect(() => {
        if (estadoFactura == 'PARCIALMENTE_PAGADO') {
            setHabilitarEntrega(true)
            if (!entrega) setEntrega('')
        } else {
            setHabilitarEntrega(false)
            setEntrega(null)
        }
        estadoFactura && onChange && onChange()
    }, [estadoFactura, entrega])

    return (
        <div className='contEstadoFactura'>
            <h4 className="tituloComponent">Seleccione un estado.</h4>
            <form>
                <select
                    className='selectEstadoFactura'
                    name="estadoFactura" id="estadoFactura"
                    onChange={({ target }) => setEstadoFactura(target.value)}
                    value={estadoFactura}
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
                        onChange={({ target }) => setEntrega(target.value)}
                        placeholder="Monto de entrega"
                        value={entrega}
                        type="number"
                        name="entrega"
                        id="entrega"
                    >
                    </input>
                }
            </form>
        </div>
    )
}
