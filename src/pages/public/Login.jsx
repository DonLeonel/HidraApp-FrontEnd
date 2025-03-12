import { useForm } from '../../hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, resetUser } from '../../redux/user/userSlice';
import { useEffect, useMemo, useState } from 'react';
import { RoutesPrivadas } from '../../utils';
import { fetchDataService } from '../../services';
import { validarLogin } from '../../validations'
import { CuadroMensaje } from '../../components/comun/CuadroMensaje';
import '../../styles/components/comun/validations.css';
import '../../styles/pages/login.css';

const Login = () => {

    const initialForm = useMemo(() => (
        { email: '', password: '' }
    ), []);
    const { formState, onInputChange } = useForm(initialForm);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorsValidation, setErrorsValidation] = useState(null)
    const [mostrarMensaje, setMostrarMensaje] = useState({ mostrar: false })


    useEffect(() => {
        dispatch(resetUser())
    }, [])

    const login = async (e) => {
        e.preventDefault();

        const errors = validarLogin(formState)
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
                { entity: 'auth/login', options }
            )
            if (error) {
                console.error(error)
                if (error == 'No se pudo conectar al servidor. (ERR_CONNECTION_REFUSED)') {
                    setMostrarMensaje({ mostrar: true })
                }
            }
            else {
                const { token, usuario } = data
                dispatch(createUser({ ...usuario, token }))
                navigate(`/${RoutesPrivadas.PRIVATE}`, { replace: true })
            }
        }
        else {
            setErrorsValidation(errors)
        }
    }

    return (
        <div className='contLogin gridLogin'>
            { mostrarMensaje.mostrar &&
                <div className='contCuadroMensaje'>
                    <CuadroMensaje
                        mensaje={'No se pudo conectar al servidor.'}
                        setMostrarMensaje={setMostrarMensaje}
                    />
                </div>
            }

            <div className='boxLogin borLayout'>
                <div className='logoLogin'>
                    <img src="/logo/hidraPlusImg.jpg" alt="logo hidra plus" />
                </div>
                <form onSubmit={login}>
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
                            if (e.nombre == 'login') {
                                return (
                                    <p key={e.nombre} >{e.mensaje}</p>
                                )
                            }
                        })}
                    </div>

                    <div>
                        <button type='submit'>Ingresar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;