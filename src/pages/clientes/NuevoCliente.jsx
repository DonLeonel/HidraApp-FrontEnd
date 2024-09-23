import { Link } from 'react-router-dom'
import { fetchDataService } from '../../services/apiService'
import '../../styles/pages/formNuevos.css'
import { useForm } from '../../hooks/index'
import { useMemo } from 'react'

export const NuevoCliente = () => {

    const handlerSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        }
        const { data, error } = await fetchDataService({ entity: 'cliente', options })
        if (error) {
            console.log(error)
        } else if (data) {
            window.location.href = '/clientes'
        }
    }

    const initialForm = useMemo(() =>
        ({ nombre: '', apellido: '', celular: '' })
        , [])

    const { formState, onInputChange } = useForm(initialForm)

    return (
        <div className='contNuevoCliente borLayout'>
            <h4 className='tituloLayout'>Nuevo Cliente</h4>

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
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        name='apellido'
                        type="text"
                        onChange={onInputChange}
                        value={formState.apellido}
                    />
                </div>
                <div className='contEntradas'>
                    <label htmlFor="celular">Celular</label>
                    <input
                        name='celular'
                        type="tel"
                        onChange={onInputChange}
                        value={formState.celular}
                    />
                </div>

                <div className='contBtn contEntradas'>
                    <Link className='btnVolver' to={'/clientes'}>Volver</Link>
                    <button className='btnGuardar' type="submit">Guardar</button>
                </div>
            </form>
        </div>
    )
}
