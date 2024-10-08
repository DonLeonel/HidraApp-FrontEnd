import { Link } from 'react-router-dom';
import '../../styles/pages/formNuevos.css'
import { useForm } from '../../hooks';
import { useMemo } from 'react';
import { fetchDataService } from '../../services/apiService';

export const NuevaCategoria = () => {

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        }
        const { data, error } = await fetchDataService({ entity: 'categoria', options })
        error ? console.error(error) : data && (window.location.href = '/categorias')
    }

    const initialForm = useMemo(() =>
        ({ nombre: '', descripcion: '' })
        , [])

    const { formState, onInputChange } = useForm(initialForm)

    return (
        <div className='contNuevaCategoria borLayout'>
            <h4 className='tituloLayout'>Nueva Categoría</h4>

            <form onSubmit={handlerSubmit} className='formNvo' action='' id='formulario'>
                <div className='contEntradas'>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        name='nombre'
                        type="text"
                        onChange={onInputChange}
                        value={formState.nombre}
                    />
                </div>
                <div className='contEntradas'>
                    <label htmlFor="descripcion">Descripción</label>
                    <input
                        name='descripcion'
                        type="text"
                        onChange={onInputChange}
                        value={formState.descripcion}
                    />
                </div>

                <div className='contBtn contEntradas'>
                    <Link className='btnVolver' to={'/categorias'}>Volver</Link>
                    <button className='btnGuardar' type="submit">Guardar</button>
                </div>
            </form>
        </div>
    )
}
