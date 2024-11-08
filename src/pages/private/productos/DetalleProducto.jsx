import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataService } from '../../../services'
import { Role, formatARS } from '../../../utils';
import { useSelector } from 'react-redux';
import { ButtonVolver } from '../../../components/buttons';

const DetalleProducto = () => {

  const userState = useSelector((state) => state.user)
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
      error ? console.error(error) : setProducto(producto)
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
          <div>
            <h4>Nombre: <span>{producto.nombre}</span></h4>
            <h4>Categoria: <span>{producto.categoria.nombre}</span></h4>
            <h4>Descripción: <span>{producto.descripcion}</span></h4>
          </div>
          <div>
            <h4>Stock: <span>{producto.stock}</span></h4>
            <h4>Precio: <span> {formatARS(producto.precio)}</span></h4>
            {
              producto.updatedAt && (userState.role === Role.ADMIN) &&
              <h4>Actualizado: <span className='fechaHora'>{producto.updatedAt}</span></h4>
            }
          </div>
        </div>
      }

      <div className='contButtonVolver'>
        <ButtonVolver />
      </div>
    </div >
  )
}

export default DetalleProducto