import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Footer, MenuUsuario, RecaudacionPorDia, BuscarPorEstados, RecaudacionEntreFechas } from './components/index'
import { Clientes, NuevoCliente, EditarCliente, DetalleCliente } from './pages/clientes/index'
import { Productos, NuevoProducto, DetalleProducto, EditarProducto } from './pages/productos/index'
import { Categorias, NuevaCategoria, EditarCategoria } from './pages/categorias/index'
import { Facturas, NuevaFactura, DetalleFactura, EditarFactura } from './pages/facturas/index'
import { Reportes, ReportesClientes, ReportesFacturas, ReportesProductos } from './pages/reportes/index'



export const AppRouter = () => {
  return (
    <>
      <MenuUsuario />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/nuevo-cliente' element={<NuevoCliente />} />
        <Route path='/editar-cliente/:id' element={<EditarCliente />} />
        <Route path='/detalle-cliente/:id' element={<DetalleCliente />} />

        <Route path='/facturas' element={<Facturas />} />
        <Route path='/nueva-factura' element={<NuevaFactura />} />
        <Route path='/nueva-factura/cliente/:id' element={<NuevaFactura />} />
        <Route path='/detalle-factura/:id' element={<DetalleFactura />} />
        <Route path='/editar-factura/:id' element={<EditarFactura />} />

        <Route path='/productos' element={<Productos />} />
        <Route path='/nuevo-producto' element={<NuevoProducto />} />
        <Route path='/editar-producto/:id' element={<EditarProducto />} />
        <Route path='/detalle-producto/:id' element={<DetalleProducto />} />

        <Route path='/categorias' element={<Categorias />} />
        <Route path='/nueva-categoria' element={<NuevaCategoria />} />
        <Route path='/editar-categoria/:id' element={<EditarCategoria />} />

        <Route path='/reportes' element={<Reportes />}>
          <Route path='facturas' element={<ReportesFacturas />} >
            <Route path='recaudacion-por-dia' element={<RecaudacionPorDia />} />
            <Route path='recaudacion-entre-fechas' element={<RecaudacionEntreFechas />} />            
            <Route path='buscar-por-estados' element={<BuscarPorEstados />} />
          </Route>
          <Route path='clientes' element={<ReportesClientes />} >

          </Route>
          <Route path='productos' element={<ReportesProductos />} >

          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  )
}