import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { MenuUsuario } from './components/MenuUsuario'
import { Footer } from './components'
import { Clientes } from './pages/clientes/Clientes'
import { NuevoCliente } from './pages/clientes/NuevoCliente'
import { EditarCliente } from './pages/clientes/EditarCliente'
import { DetalleCliente } from './pages/clientes/DetalleCliente'
import { Productos } from './pages/productos/Productos'
import { NuevoProducto } from './pages/productos/NuevoProducto'
import { Categorias } from './pages/categorias/Categorias'
import { NuevaCategoria } from './pages/categorias/NuevaCategoria'
import { Facturas } from './pages/facturas/Facturas'
import { NuevaFactura } from './pages/facturas/NuevaFactura'
import { EditarProducto } from './pages/productos/EditarProducto'
import { DetalleProducto } from './pages/productos/DetalleProducto'
import { EditarCategoria } from './pages/categorias/EditarCategoria'
import { DetalleFactura } from './pages/facturas/DetalleFactura'
import { EditarFactura } from './pages/facturas/EditarFactura'

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
        <Route path='/detalle-factura/:id' element={<DetalleFactura />} />
        <Route path='/editar-factura/:id' element={<EditarFactura />} />

        <Route path='/productos' element={<Productos />} />
        <Route path='/nuevo-producto' element={<NuevoProducto />} />
        <Route path='/editar-producto/:id' element={<EditarProducto />} />
        <Route path='/detalle-producto/:id' element={<DetalleProducto />} />

        <Route path='/categorias' element={<Categorias />} />
        <Route path='/nueva-categoria' element={<NuevaCategoria />} />
        <Route path='/editar-categoria/:id' element={<EditarCategoria/>} />
      </Routes>
      <Footer />
    </>
  )
}