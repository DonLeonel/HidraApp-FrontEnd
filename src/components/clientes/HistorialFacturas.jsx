import { useState, useEffect } from "react"
import { ButtonVerOcultar } from "../buttons"
import { fetchDataService } from "../../services"
import { ListadoFacturas } from "../facturas/ListadoFacturas"

export const HistorialFacturas = ({ cliente }) => {

    const [facturas, setFacturas] = useState(null)
    const [mostrarFacturas, setMostrarFacturas] = useState(false)

    useEffect(() => {
        if (mostrarFacturas && facturas == null) {
            const abortController = new AbortController()
            const { signal } = abortController

            const options = {
                signal
            }
            const fetchInfo = async () => {
                const { data: facturas, error } = await fetchDataService(
                    { entity: `factura/por-cliente/${cliente.id}`, options }
                )               
                error ? console.error(error) : setFacturas(facturas)
            }
            fetchInfo()
            return () => abortController.abort()
        }
    }, [mostrarFacturas])

    const handlerFacturas = () => {        
        setMostrarFacturas(!mostrarFacturas)            
    }

    return (
        <>
            <div className='contButtonVerOcultar'>
                <ButtonVerOcultar
                    text={'Historial de Facturas'}
                    handleVerOcultar={handlerFacturas}
                    ver={mostrarFacturas}
                />
            </div>

            <div className='contDetCuenta'>
                {mostrarFacturas &&
                    <>                                          
                        <ListadoFacturas
                            facturas={facturas}
                        />
                    </>

                }
            </div>
        </>
    )
}