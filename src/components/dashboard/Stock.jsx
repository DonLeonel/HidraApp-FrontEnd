import { BoxStock } from './BoxStock'
import { Loading } from '../loading'
import { fetchDataPaginatedService } from '../../services'
import { useEffect, useState } from 'react'
import '../../styles/components/dashboard/stock.css'

export const Stock = () => {

  const paginateInit = { page: 0, size: 10 }
  const [paginate, setPaginate] = useState(paginateInit)
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      }
    }
    fetchInfo()

    return () => abortController.abort()
  }, [paginate])

  return (
    <div className='contStock borLayout'>
      <h4 className='tituloLayout'>Stock disponible</h4>

      <section className='cont-box'>

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
