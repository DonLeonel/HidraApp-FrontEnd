import { useState, useEffect } from 'react'
import { fetchDataService } from '../services/apiService'

export const FormaPagoFactura = ({ setIdFormaDePago, idFormaDePago, onChange }) => {

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

    const handlerOnChange = (e) => {
        setIdFormaDePago(parseInt(e.target.value, 10))
        onChange()
    }

    return (
        <div className='contFormaDepago'>
            <h4>Agrege una forma de pago.</h4>
            <div>
                {idFormaDePago &&
                    <select
                        className='selectFormaDePago'
                        name="formaDePago" id="formaDePago"
                        onChange={handlerOnChange}
                        value={idFormaDePago}
                    >
                        {
                            formasDePago.map(f => {
                                return (
                                    <option key={f.id} value={f.id}>
                                        {f.nombre.toUpperCase()}
                                    </option>
                                )
                            })
                        }
                    </select>}
            </div>
        </div>
    )
}
