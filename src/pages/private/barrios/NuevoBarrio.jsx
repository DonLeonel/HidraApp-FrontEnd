import { useNavigate } from "react-router-dom"
import { fetchDataService } from "../../../services"
import { useMemo } from "react"
import { useForm } from "../../../hooks"
import { RoutesPrivadas } from "../../../utils"
import { ButtonGuardar, ButtonVolver } from "../../../components"
import '../../../styles/pages/formNuevos.css'

const NuevoBarrio = () => {
    const navigate = useNavigate()

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        }
        const { data, error } = await fetchDataService(
            { entity: 'barrio', options }
        )
        error ? console.error(error) :
            data &&
            navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.BARRIOS}`, { replace: true })
    }

    const initialForm = useMemo(() =>
        ({ nombre: '', descripcion: '' })
        , [])

    const { formState, onInputChange } = useForm(initialForm)

    return (
        <div className='contNuevoBarrio borLayout'>
            <h4 className='tituloLayout'>Nuevo Barrio</h4>

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

                <div className='contButtonVolverGuardar'>
                    <ButtonVolver />
                    <ButtonGuardar handlerSubmit={handlerSubmit} />
                </div>
            </form>
        </div>
    )
}

export default NuevoBarrio