import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { RoutesPrivadas } from "../../utils/router"

export const RolGuard = ({ rol }) => {
    const userState = useSelector((state) => state.user)
    return userState.role === rol ?
        <Outlet /> : <Navigate to={RoutesPrivadas.DASHBOARD} />
}