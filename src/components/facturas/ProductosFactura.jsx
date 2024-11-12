import { useState, useEffect } from "react"
import { fetchDataPaginatedService } from "../../services"
import { Loading } from "../loading"
import '../../styles/components/facturas/productoFactura.css'

export const ProductosFactura = ({ addProducto }) => {

    const paginate = { page: 0, size: 100 }
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

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
            if (error) {
                console.log(error)
            } else {
                setProductos(productos)
                setLoading(false)
            }

        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    return (
        <div className='contProductos'>
            <h4 className="tituloComponent">Agregue los productos al detalle.</h4>
            <div className='contBox'>
                {loading ?
                    <>
                        <Loading width={'45%'} height={'50px'} margin={'5px'} />
                        <Loading width={'45%'} height={'50px'} margin={'5px'} />
                        <Loading width={'45%'} height={'50px'} margin={'5px'} />
                        <Loading width={'45%'} height={'50px'} margin={'5px'} />
                    </>
                    :
                    productos &&
                    productos.map(p => {
                        return (
                            <div
                                key={p.id} onClick={() => addProducto(p, 1)}
                                className='boxProducto'
                            >
                                <p>{p.nombre}</p>
                                <p><img src="/icons-app/plusGreen.png" alt="" /></p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}