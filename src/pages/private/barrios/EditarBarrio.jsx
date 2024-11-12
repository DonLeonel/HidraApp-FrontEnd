import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchDataService } from "../../../services"
import '../../../styles/pages/formNuevos.css'
import { ButtonGuardar, ButtonVolver } from "../../../components"
import { useForm } from "../../../hooks"

const EditarBarrio = () => {
    const defaultValueInput = ''
    const [barrio, setBarrio] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: barrio, error } = await fetchDataService(
                { entity: 'barrio', id, options }
            )

            if (error) {
                console.log(error)
            } else {
                setBarrio(barrio)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const { formState, onInputChange } = useForm(barrio)

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        }
        const { data, error } = await fetchDataService(
            { entity: 'barrio', id: formState.id, options }
        )
        error ? console.error(error) :
            data && alert('Se edito correctamente el Barrio')
    }

    return (
        <div className='contEditarBarrio borLayout'>
            <h4 className='tituloLayout'>Editar Barrio</h4>

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

export default EditarBarrio