import { Link, useParams } from 'react-router-dom';
//import { Cargando } from '../../components/Cargando';
import { useForm } from '../../hooks/index';
import { fetchDataService } from '../../services/apiService'
import { useState, useEffect } from 'react';

export const EditarCategoria = () => {

  const defaultValueInput = ''
  const [categoria, setCategoria] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    const options = {
      signal
    }

    const fetchInfo = async () => {
      const { data: categoria, error } = await fetchDataService(
        { entity: 'categoria', id, options }
      )

      if (error) {
        console.log(error)
      } else {
        setCategoria(categoria)
      }
    }
    fetchInfo()
    return () => abortController.abort()
  }, [])

  const { formState, onInputChange } = useForm(categoria)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    }
    const { data, error } = await fetchDataService({ entity: 'categoria', id: formState.id, options })
    error ? console.error(error) : data && (window.location.href = '/categorias')
  }

  return (
    <div className='contNuevaCategoria borLayout'>
      <h4 className='tituloLayout'>Editar Categoría</h4>

      {
        formState &&
        <form onSubmit={handlerSubmit} className='formNvo' action='' id='formulario'>
          <div className='contEntradas'>
            <label htmlFor="nombre">Nombre</label>
            <input
              name='nombre'
              type="text"
              onChange={onInputChange}
              value={formState.nombre || defaultValueInput}

            />
          </div>
          <div className='contEntradas'>
            <label htmlFor="descripcion">Descripción</label>
            <input
              name='descripcion'
              type="text"
              onChange={onInputChange}
              value={formState.descripcion || defaultValueInput}

            />
          </div>

          <div className='contBtn contEntradas'>
            <Link className='btnVolver' to={'/categorias'}>Volver</Link>
            <button className='btnGuardar' type="submit">Guardar</button>
          </div>
        </form>
      }
    </div>
  )
}