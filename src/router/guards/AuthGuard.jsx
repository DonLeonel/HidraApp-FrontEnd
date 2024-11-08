import { Outlet, Navigate } from "react-router-dom"
import { RoutesPublicas } from "../../utils/router"
import { useSelector } from "react-redux"

export const AuthGuard = () => {
  const userState = useSelector((state) => state.user)

  const isAuthenticated = userState && userState.id;
  return isAuthenticated ?
    <Outlet /> : <Navigate replace to={RoutesPublicas.LOGIN} />
}