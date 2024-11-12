import { useParams } from 'react-router-dom'
import { useForm } from '../../../hooks'
import { fetchDataService } from '../../../services'
import { useState, useEffect } from 'react'
import { ButtonGuardar, ButtonVolver } from '../../../components'
import '../../../styles/pages/formNuevos.css'

const EditarCategoria = () => {

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
    error ? console.error(error) :
      data && alert('Se edito correctamente el Barrio')
  }

  return (
    <div className='contEditarCategoria borLayout'>
      <h4 className='tituloLayout'>Editar Categoría</h4>

      {
        formState &&
        <form onSubmit={handlerSubmit} className='formNvo' id='formulario'>
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

          <div className='contButtonVolverGuardar'>
            <ButtonVolver />
            <ButtonGuardar handlerSubmit={handlerSubmit} />
          </div>
        </form>
      }
    </div>
  )
}

export default EditarCategoria