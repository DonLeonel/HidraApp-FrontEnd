import { BoxStock } from './BoxStock'
import { fetchDataPaginatedService } from '../services/apiService'
import { useEffect, useState } from 'react'
import '../styles/components/stock.css'


export const Stock = () => {

  const paginateInit = { page: 0, size: 10 }
  const [paginate, setPaginate] = useState(paginateInit)
  const [productos, setProductos] = useState([])

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
      const { content: productos, error } = await fetchDataPaginatedService(
        { entity: 'producto', paginate, options }
      )

      if (error) {
        console.log(error)
      } else {
        setProductos(productos)
      }
    }
    fetchInfo()

    return () => abortController.abort()
  }, [paginate])

  return (
    <div className='contStock borLayout'>
      <h4>Stock disponible</h4>

      <section className='cont-box'>
        {productos && productos.map(p => {
          return (
            <BoxStock
              key={p.id}
              nombre={p.nombre}
              cantidad={p.stock}
            />
          )
        })}
      </section>
    </div>
  )
}