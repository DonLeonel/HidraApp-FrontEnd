import { useState, useEffect, useRef } from 'react'
import { fetchDataService } from '../services/apiService'

export const FormaPagoFactura = ({ setIdFormaDePago, idFormaDePago, onChange = null }) => {

    const [formasDePago, setFormasDePago] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal,
            headers: {
                sortType: 'LOWER'
            }
        }
        const fetchInfo = async () => {
            const { data: formasDePago, error } = await fetchDataService(
                { entity: 'forma-de-pago', options }
            )
            error ? console.log(error) : setFormasDePago(formasDePago)
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        idFormaDePago && handlerOnChange();
    }, [idFormaDePago])

    const handlerOnChange = () => {
        onChange && onChange()
    }

    return (
        <div className='contFormaDepago'>
            <h4>Agregue una forma de pago.</h4>
            <form>
                <select
                    className='selectFormaDePago'
                    name="formaDePago" id="formaDePago"
                    onChange={(e) => setIdFormaDePago(parseInt(e.target.value, 10))}
                    value={idFormaDePago || ''}
                >
                    <option>SELECCIONE...</option>
                    {
                        formasDePago.map(f => {
                            return (
                                <option key={f.id} value={f.id}>
                                    {f.nombre.toUpperCase()}
                                </option>
                            )
                        })
                    }
                </select>
            </form>
        </div>
    )
}
