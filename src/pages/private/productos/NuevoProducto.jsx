import { useEffect, useState, useMemo } from 'react'
import { fetchDataService } from '../../../services'
import { useForm } from '../../../hooks'
import '../../../styles/pages/formNuevos.css'
import { ButtonVolver, ButtonGuardar } from '../../../components/buttons'
import { RoutesPrivadas } from '../../../utils'
import { useNavigate } from 'react-router-dom'

const NuevoProducto = () => {

  const [categorias, setCategorias] = useState([])
  const navigate = useNavigate()

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
      const { data: categorias, error } = await fetchDataService(
        { entity: 'categoria', options }
      )

      if (error) {
        console.log(error)
      } else {
        setCategorias(categorias)
      }
    }
    fetchInfo()

    return () => abortController.abort()
  }, [])

  const initialForm = useMemo(() =>
    ({ nombre: '', idCategoria: '', descripcion: '', stock: '', precio: '' })
    , [])

  const { formState, onInputChange } = useForm(initialForm)

  const handlerSubmit = async (e) => {
    e.preventDefault()

    const producto = {
      ...formState,
      idCategoria: parseInt(formState.idCategoria, 10),
      stock: parseInt(formState.stock, 10),
      precio: parseFloat(formState.precio)
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    }
    const { data, error } = await fetchDataService(
      { entity: 'producto', options }
    )
    error ? console.error(error)
      : data && navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.PRODUCTOS}`, { replace: true })
  }

  return (
    <div className='contNuevoProducto borLayout'>
      <h4 className='tituloLayout'>Nuevo producto</h4>

      <form onSubmit={handlerSubmit} className='formNvo' action='' id='formulario'>
        <div className='contEntradas'>
          <label htmlFor="nombre">Nombre</label>
          <input
            name='nombre'
            type="text"
            value={formState.nombre}
            onChange={onInputChange}
          />
        </div>

        <div className='contEntradas'>
          <label htmlFor="categoria">Categoria</label>
          <select
            className='select'
            name="idCategoria"
            id="categoriaProd"
            value={formState.idCategoria}
            onChange={onInputChange}
          >
            <option value={null}>seleccione</option>
            {categorias && categorias.map((c) => {
              return (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              )
            })}
          </select>
        </div>

        <div className='contEntradas'>
          <label htmlFor="descripcion">Descripcion</label>
          <input
            name='descripcion'
            type="text"
            value={formState.descripcion}
            onChange={onInputChange}
          />
        </div>

        <div className='contEntradas'>
          <label htmlFor="stock">Stock</label>
          <input
            name='stock'
            type="number"
            value={formState.stock}
            onChange={onInputChange}
          />
        </div>

        <div className='contEntradas'>
          <label htmlFor="precio">Precio</label>
          <input
            name='precio'
            type="number"
            value={formState.precio}
            onChange={onInputChange}
          />
        </div>

        <div className='contButtonGuardarVolver'>
          <ButtonVolver />
          <ButtonGuardar handlerSubmit={handlerSubmit} />
        </div>
      </form>
    </div>
  )
}

export default NuevoProducto