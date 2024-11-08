import { useNavigate } from "react-router-dom"
import { resetUser } from "../../redux/user/userSlice"
import { RoutesPublicas } from "../../utils/router"
import { useDispatch } from "react-redux"

export const LogOut = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const logOut = (e) => {
        e.preventDefault()
        dispatch(resetUser())
        navigate(RoutesPublicas.LOGIN, { replace: true })
    }

    return (
        <button onClick={logOut}>
            <span className='salir'>Salir</span>
        </button>
    )
}