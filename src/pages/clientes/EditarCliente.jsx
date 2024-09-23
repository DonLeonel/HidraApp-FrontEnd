import { Link, useParams } from 'react-router-dom'
import { useForm } from '../../hooks/index';
import { fetchDataService } from '../../services/apiService'
import { useEffect, useState } from 'react';

export const EditarCliente = () => {

    const defaultValueInput = ''
    const { id } = useParams()
    const [cliente, setCliente] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: cliente, error } = await fetchDataService(
                { entity: 'cliente', id, options }
            )

            if (error) {
                console.log(error)
            } else {
                setCliente(cliente)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const { formState, onInputChange } = useForm(cliente)

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const cliente = {
            nombre: formState.nombre,
            apellido: formState.apellido,
            celular: formState.celular
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        }
        const { data, error } = await fetchDataService({ entity: 'cliente', id: formState.id, options })
        if (error) {
            console.log(error)
        } else if (data) {
            window.location.href = '/clientes'
        }
    }

    return (
        <div className='contEditarCliente borLayout'>
            <h4 className='tituloLayout'>Editar Cliente</h4>
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
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            name='apellido'
                            type="text"
                            onChange={onInputChange}
                            value={formState.apellido || defaultValueInput}
                        />
                    </div>
                    <div className='contEntradas'>
                        <label htmlFor="celular">Celular</label>
                        <input
                            name='celular'
                            type="tel"
                            onChange={onInputChange}
                            value={formState.celular || defaultValueInput}
                        />
                    </div>


                    {/* //cliente && cliente.contacto &&
                    /*<>
                    <div className='contEntradas'>
                        <label htmlFor="localidad">Localidad</label>
                        <input
                            name='localidad'
                            type="text"
                            onChange={handlerValue}
                            value={cliente.contacto.localidad}
                        />
                    </div>
                    <div className='contEntradas'>
                        <label htmlFor="direccion">Direccion</label>
                        <input
                            name='direccion'
                            type="text"
                            onChange={handlerValue}
                            value={cliente.contacto.direccion}
                        />
                    </div>
                </>*/ }

                    <div className='contBtn contEntradas'>
                        <Link className='btnVolver' to={'/clientes'}>Volver</Link>
                        <button className='btnGuardar' type="submit">Guardar</button>
                    </div>
                </form>
            }
        </div>
    )
}