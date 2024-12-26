import { useForm } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { RoutesPublicas } from '../../utils';
import { fetchDataService } from '../../services';
import { validarUsuario } from '../../validations'
import '../../styles/pages/registrarse.css';
import '../../styles/components/comun/validations.css';
import { useState } from 'react';

export const Registrarse = () => {

    const initialForm = useMemo(() => (
        { nombre: '', apellido: '', email: '', password: '', rePassword: '' }
    ), [])

    const { formState, onInputChange } = useForm(initialForm)
    const [errorsValidation, setErrorsValidation] = useState(null)

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault()

        const errors = validarUsuario(formState)
        if (errors.length <= 0) {
            setErrorsValidation(null)
            const options = {
                method: "POST",
                body: JSON.stringify(formState),
                headers: {
                    "content-type": "application/json"
                }
            }

            const { data, error } = await fetchDataService(
                { entity: 'auth/register', options }
            )
            if (data) {
                navigate(`/${RoutesPublicas.LOGIN}`, { replace: true })
                alert('Usuario creado con exito.')
            }
            else {
                console.error(error)
            }
        } else {
            setErrorsValidation(errors)
        }
    }

    return (
        <div className='contRegister'>
            <div className='boxRegister borLayout'>

                <form onSubmit={register}>
                    <div>
                        <label htmlFor="nombre">Nombre</label>

                        <input
                            onChange={onInputChange}
                            value={formState.nombre}
                            name='nombre'
                            title='nombre'
                            type="text"
                        />
                    </div>
                    <div className='errorValidation'>
                        {errorsValidation && errorsValidation.map(e => {
                            if (e.nombre == 'nombre') {
                                return (
                                    <p key={e.nombre} >{e.mensaje}</p>
                                )
                            }
                        })}
                    </div>


                    <div>
                        <label htmlFor="apellido">Apellido</label>

                        <input
                            onChange={onInputChange}
                            value={formState.apellido}
                            name='apellido'
                            title='apellido'
                            type="text"
                        />
                    </div>
                    <div className='errorValidation'>
                        {errorsValidation && errorsValidation.map(e => {
                            if (e.nombre == 'apellido') {
                                return (
                                    <p key={e.nombre} >{e.mensaje}</p>
                                )
                            }
                        })}
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>

                        <input
                            onChange={onInputChange}
                            value={formState.email}
                            name='email'
                            title='email'
                            type="email"
                        />
                    </div>
                    <div className='errorValidation'>
                        {errorsValidation && errorsValidation.map(e => {
                            if (e.nombre == 'email') {
                                return (
                                    <p key={e.nombre} >{e.mensaje}</p>
                                )
                            }
                        })}
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            onChange={onInputChange}
                            value={formState.password}
                            name='password'
                            title='contraseña'
                            type="password"
                        />
                    </div>
                    <div className='errorValidation'>
                        {errorsValidation && errorsValidation.map(e => {
                            if (e.nombre == 'password') {
                                return (
                                    <p key={e.nombre} >{e.mensaje}</p>
                                )
                            }
                        })}
                    </div>

                    <div>
                        <label htmlFor="rePassword">Reingresar Contraseña</label>
                        <input
                            onChange={onInputChange}
                            value={formState.rePassword}
                            name='rePassword'
                            title='contraseña'
                            type="password"
                        />
                    </div>
                    <div className='errorValidation'>
                        {errorsValidation && errorsValidation.map(e => {
                            if (e.nombre == 'rePassword') {
                                return (
                                    <p key={e.nombre} >{e.mensaje}</p>
                                )
                            }
                        })}
                    </div>

                    <div>
                        <button type='submit'>Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registrarse;