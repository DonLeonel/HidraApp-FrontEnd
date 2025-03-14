import { Route, BrowserRouter, Navigate } from 'react-router-dom'
import { RoutesPrivadas, RoutesPublicas } from '../utils/router'
import { RoutesWithNotFound } from './RoutesWithNotFound'
import { AuthGuard } from './guards/AuthGuard'
import { lazy, Suspense } from 'react'
import { Footer } from '../components'

const Login = lazy(() => import('../pages/public/Login'))
const Private = lazy(() => import('../pages/private/Private'))

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <div className='grid'>
          <RoutesWithNotFound >
            <Route path='/' element={<Navigate to={RoutesPrivadas.PRIVATE} />} />
            <Route path={RoutesPublicas.LOGIN} element={<Login />} />
            <Route element={<AuthGuard />} >
              <Route path={`${RoutesPrivadas.PRIVATE}/*`} element={<Private />} />
            </Route>
          </RoutesWithNotFound>
          <Footer />
        </div>
      </Suspense>
    </BrowserRouter >
  )
}