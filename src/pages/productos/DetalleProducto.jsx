import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchDataService } from '../../services/apiService'

export const DetalleProducto = () => {

  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    const options = {
        signal
    }

    const fetchInfo = async () => {
        const { data: producto, error } = await fetchDataService(
            { entity: 'producto', id, options }
        )

        if (error) {
            console.log(error)
        } else {
          setProducto(producto)
        }
    }
    fetchInfo()
    return () => abortController.abort()
}, [])
  
  return (
    <div className='contDetalleProducto borLayout' >
      <h4 className='tituloLayout'>Detalle Producto</h4>

      {
        producto &&
        <div className='detalles'>
          <h4>Nombre: <span>{producto.nombre}</span></h4>
          <h4>Categoria: <span>{producto.categoria.nombre}</span></h4>
          <h4>Descripcion: <span>{producto.descripcion}</span></h4>
          <h4>Stock: <span>{producto.stock}</span></h4>
          <h4>Precio: $<span> {producto.precio}</span></h4>
        </div>
      }

      <div className='contBtn contEntradas'>
        <Link className='btnVolver' to={'/productos'}>Volver</Link>
      </div>
    </div >
  )
}