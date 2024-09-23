import { useState, useEffect } from "react"
import { fetchDataPaginatedService } from "../services/apiService"


export const ProductosFactura = ({ addProducto }) => {

    const paginate = { page: 0, size: 100 }
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal
        }
        const fetchInfo = async () => {
            const { content: productos, error } = await fetchDataPaginatedService(
                { entity: 'producto', paginate, options }
            )
            error ? console.log(error) : setProductos(productos)
        }
        fetchInfo()

        return () => abortController.abort()
    }, [])

    return (
        <div className='contProductos'>
            <h4>Agregue los productos al detalle.</h4>
            <div className='contBox'>
                {productos &&
                    productos.map(p => {
                        return (
                            <div key={p.id} onClick={() => addProducto(p, 1)} className='boxProducto'>
                                <p>{p.nombre}</p>
                                <p><img src="/icons-app/plus.png" alt="" /></p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
