import { RoutesWithNotFound } from "../../router"
import { Navigate, Route } from "react-router-dom"
import { RoutesPrivadas, RoutesRepAnidadas, Role } from "../../utils"
import { RolGuard } from "../../router/guards"
import { lazy } from 'react'

const Dashboard = lazy(() => import('./dashboard/Dashboard'))
const Clientes = lazy(() => import('./clientes/Clientes'))
const NuevoCliente = lazy(() => import('./clientes/NuevoCliente'))
const DetalleCliente = lazy(() => import('./clientes/DetalleCliente'))
const Ventas = lazy(() => import('./ventas/Ventas'))
const NuevaVenta = lazy(() => import('./ventas/NuevaVenta'))
const DetalleVenta = lazy(() => import('./ventas/DetalleVenta'))
const EditarVenta = lazy(() => import('./ventas/EditarVenta'))
const Facturas = lazy(() => import('./facturas/Facturas'))
const NuevaFactura = lazy(() => import('./facturas/NuevaFactura'))
const ConfirmarFactura = lazy(() => import('./facturas/ConfirmarFactura'))
const DetalleFactura = lazy(() => import('./facturas/DetalleFactura'))
const Productos = lazy(() => import('./productos/Productos'))
const Barrios = lazy(() => import('./barrios/Barrios'))
const NuevoBarrio = lazy(() => import('./barrios/NuevoBarrio'))
const EditarBarrio = lazy(() => import('./barrios/EditarBarrio'))
const DetalleProducto = lazy(() => import('./productos/DetalleProducto'))
const Categorias = lazy(() => import('./categorias/Categorias'))
const EditarCliente = lazy(() => import('./clientes/EditarCliente'))
const NuevoProducto = lazy(() => import('./productos/NuevoProducto'))
const EditarProducto = lazy(() => import('./productos/EditarProducto'))
const EditarFactura = lazy(() => import('./facturas/EditarFactura'))
const NuevaCategoria = lazy(() => import('./categorias/NuevaCategoria'))
const EditarCategoria = lazy(() => import('./categorias/EditarCategoria'))
const Reportes = lazy(() => import('./reportes/Reportes'))
const ReportesFacturas = lazy(() => import('./reportes/ReportesFacturas'))
const RecaudacionPorDia = lazy(() => import('../../components/reports/RecaudacionPorDia'))
const RecaudacionEntreFechas = lazy(() => import('../../components/reports/RecaudacionEntreFechas'))
const BusquedaPorEstado = lazy(() => import('../../components/reports/BusquedaPorEstado'))
const ReportesClientes = lazy(() => import('./reportes/ReportesClientes'))
const ClientesMorosos = lazy(() => import('../../components/reports/ClientesMorosos'))
const ReportesProductos = lazy(() => import('./reportes/ReportesProductos'))

const Private = () => {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={RoutesPrivadas.DASHBOARD} />} />
      <Route path={RoutesPrivadas.DASHBOARD} element={<Dashboard />} />
      <Route path={RoutesPrivadas.CLIENTES} element={<Clientes />} />
      <Route path={`${RoutesPrivadas.CLIENTES}/${RoutesPrivadas.NUEVO}`} element={<NuevoCliente />} />
      <Route path={`${RoutesPrivadas.CLIENTES}/${RoutesPrivadas.DETALLE}/:id`} element={<DetalleCliente />} />

      <Route path={RoutesPrivadas.VENTAS} element={<Ventas />} />
      <Route path={`${RoutesPrivadas.VENTAS}/${RoutesPrivadas.NUEVO}`} element={<NuevaVenta />} />
      <Route path={`${RoutesPrivadas.VENTAS}/${RoutesPrivadas.NUEVO}/${RoutesPrivadas.CLIENTES}/:id`} element={<NuevaVenta />} />
      <Route path={`${RoutesPrivadas.VENTAS}/${RoutesPrivadas.DETALLE}/:id`} element={<DetalleVenta />} />

      <Route path={RoutesPrivadas.FACTURAS} element={<Facturas />} />
      <Route path={`${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.NUEVO}`} element={<NuevaFactura />} />      
      <Route path={`${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.DETALLE}/:id`} element={<DetalleFactura />} />
      <Route path={RoutesPrivadas.PRODUCTOS} element={<Productos />} />
      <Route path={`${RoutesPrivadas.PRODUCTOS}/${RoutesPrivadas.DETALLE}/:id`} element={<DetalleProducto />} />
      <Route path={RoutesPrivadas.BARRIOS} element={<Barrios />} />
      <Route path={RoutesPrivadas.CATEGORIAS} element={<Categorias />} />

      <Route element={<RolGuard rol={Role.ADMIN} />}>
        <Route path={`${RoutesPrivadas.PRODUCTOS}/${RoutesPrivadas.NUEVO}`} element={<NuevoProducto />} />
        <Route path={`${RoutesPrivadas.PRODUCTOS}/${RoutesPrivadas.EDITAR}/:id`} element={<EditarProducto />} />
        <Route path={`${RoutesPrivadas.CLIENTES}/${RoutesPrivadas.EDITAR}/:id`} element={<EditarCliente />} />
        <Route path={`${RoutesPrivadas.VENTAS}/${RoutesPrivadas.EDITAR}/:id`} element={<EditarVenta />} />
        <Route path={`${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.EDITAR}/:id`} element={<EditarFactura />} />
        <Route path={`${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.CONFIRMAR}`} element={<ConfirmarFactura />} />
        <Route path={`${RoutesPrivadas.BARRIOS}/${RoutesPrivadas.NUEVO}`} element={<NuevoBarrio />} />
        <Route path={`${RoutesPrivadas.BARRIOS}/${RoutesPrivadas.EDITAR}/:id`} element={<EditarBarrio />} />
        <Route path={`${RoutesPrivadas.CATEGORIAS}/${RoutesPrivadas.NUEVO}`} element={<NuevaCategoria />} />
        <Route path={`${RoutesPrivadas.CATEGORIAS}/${RoutesPrivadas.EDITAR}/:id`} element={<EditarCategoria />} />
        <Route path={RoutesPrivadas.REPORTES} element={<Reportes />}>
          <Route path={RoutesPrivadas.VENTAS} element={<ReportesFacturas />} >
            <Route path={RoutesRepAnidadas.RECAUDACION_POR_DIA} element={<RecaudacionPorDia />} />
            <Route path={RoutesRepAnidadas.RECAUDACION_ENTRE_FECHAS} element={<RecaudacionEntreFechas />} />
            <Route path={RoutesRepAnidadas.BUSQUEDA_POR_ESTADOS} element={<BusquedaPorEstado />} />
          </Route>
          <Route path={RoutesPrivadas.CLIENTES} element={<ReportesClientes />} >
            <Route path={RoutesRepAnidadas.MOROSOS} element={<ClientesMorosos />} />
          </Route>
          <Route path={RoutesPrivadas.PRODUCTOS} element={<ReportesProductos />} >
          </Route>
        </Route>
      </Route>
    </RoutesWithNotFound>
  )
}

export default Private