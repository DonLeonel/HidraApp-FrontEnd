import { useForm } from '../../hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, resetUser } from '../../redux/user/userSlice';
import { useEffect, useMemo } from 'react';
import { Role, RoutesPrivadas } from '../../utils';
import '../../styles/pages/login.css';

const Login = () => {

    const initialForm = useMemo(() => (
        { email: '', password: '' }
    ), []);
    const { formState, onInputChange } = useForm(initialForm);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetUser())
    }, [])

    const login = (e) => {
        e.preventDefault();
        const { email, password } = formState

        // Simulación de autenticación exitosa
        const user = {
            id: 1,
            nombre: 'Jose',
            apellido: 'Gonzalez',
            email,
            role: Role.ADMIN,
        }

        dispatch(createUser(user))
        navigate(`/${RoutesPrivadas.PRIVATE}`, { replace: true })
    };

    return (
        <div className='contLogin'>
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
                    <div>
                        <button type='submit'>Ingresar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;