import { useParams } from 'react-router-dom'
import { useForm } from '../../../hooks';
import { fetchDataService } from '../../../services'
import { useEffect, useState } from 'react';
import { ButtonGuardar, ButtonVolver } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { RoutesPrivadas } from '../../../utils';
import '../../../styles/pages/formNuevos.css'

const EditarCliente = () => { //falta editar el barrio

    const defaultValueInput = ''
    const { id } = useParams()
    const [cliente, setCliente] = useState(null)
    const [barrios, setBarrios] = useState([])
    const navigate = useNavigate()

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
            error ? console.error(error) :
                setCliente({
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    celular: cliente.celular,
                    idBarrio: cliente.barrio.id
                })
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal
        }
        const fetchInfo = async () => {
            const { data: barrios, error } = await fetchDataService(
                { entity: 'barrio', options }
            )
            error ? console.error(error) : setBarrios(barrios)
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
            celular: formState.celular,
            idBarrio: formState.idBarrio
        }       
        
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        }
        const { data, error } = await fetchDataService(
            { entity: 'cliente', id, options }
        )                 
        error ? console.error(error) :         
        data && alert('Se edito correctamente.')
        
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
                    <div className='contEntradas'>
                    <label htmlFor="barrio">Barrio</label>
                    <select
                        className='select'
                        name="idBarrio"
                        value={formState.idBarrio}
                        onChange={onInputChange}
                    >
                        <option value={null}>seleccione</option>
                        {barrios && barrios.map((b) => {
                            return (
                                <option key={b.id} value={b.id}>{b.nombre}</option>
                            )
                        })}
                    </select>
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

                    <div className='contButtonVolverGuardar'>
                        <ButtonVolver />
                        <ButtonGuardar handlerSubmit={handlerSubmit} />
                    </div>
                </form>
            }
        </div>
    )
}

export default EditarCliente