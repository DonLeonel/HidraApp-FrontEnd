import { useState, useEffect } from 'react'
import { ProductoVenta } from '../../components/index'
import { Link } from 'react-router-dom'
import { useProductos, useSearchDinamic } from '../../hooks/index'
import { fetchDataPaginatedService, fetchDataService } from '../../services/apiService'
import '../../styles/pages/nuevaVenta.css'

export const NuevaFactura = () => {

  const [cliente, setCliente] = useState(null)
  const [idFormaDePago, setIdFormaDePago] = useState(null)
  const [total, setTotal] = useState(0)

  const paginate = { page: 0, size: 100 }
  const [clientes, setClientes] = useState([])
  const [formasDePago, setFormasDePago] = useState([])
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const options = {
      signal,
      headers: {
        sortType: 'LOWER'
      }
    }
    const fetchInfo = async () => {
      const { content: productos, error } = await fetchDataPaginatedService(
        { entity: 'producto', paginate, options }
      )
      error ? console.log(error) : setProductos(productos)
    }
    fetchInfo()

    return () => abortController.abort()
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const options = {
      signal,
      headers: {
        sortType: 'LOWER'
      }
    }
    const fetchInfo = async () => {
      const { content: clientes, error } = await fetchDataPaginatedService(
        { entity: 'cliente', paginate, options }
      )
      error ? console.log(error) : setClientes(clientes)
    }
    fetchInfo()

    return () => abortController.abort()
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const options = {
      signal,
      headers: {
        sortType: 'LOWER'
      }
    }
    const fetchInfo = async () => {
      const { data: formasDePago, error } = await fetchDataService(
        { entity: 'forma-de-pago', options }
      )
      error ? console.log(error) : setFormasDePago(formasDePago)
    }
    fetchInfo()
    return () => abortController.abort()
  }, [])


  const { termino,
    elementosFiltrados,
    listar,
    handleSearch,
    reset
  } = useSearchDinamic(clientes, ['nombre', 'apellido']);

  const { productosEnDetalle,
    setCantidad,
    removeProducto,
    addProducto,
    setProductosEnDetalle } = useProductos()

  useEffect(() => {
    setTotal(productosEnDetalle
      .reduce((acum, p) => acum + p.precio * p.cantidad, 0)
      || 0)
  }, [productosEnDetalle])

  const cancelarFactura = () => {
    resetearCliente()
    setProductosEnDetalle([]);
  }

  const resetearCliente = () => {
    setCliente(null)
    reset()
  }

  /*const handlerSubmit = async (e) => {
    e.preventDefault()

    if (true) {
      const factura = {
        idCliente: cliente.id,
        idFormaDePago: idFormaDePago,
        detallesFactura:
          productosEnDetalle.map(p => {
            return {
              idProducto: p.id,
              cantidad: p.cantidad
            }
          })
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(factura)
      }
      const { data, error } = await fetchDataService({ entity: 'factura', options })

      error ? console.log(error) : data && (window.location.href = '/facturas')

    } else {
      alert('faltan validaciones')
    }
  }*/

  return (
    <div className='contNuevaVenta borLayout'>
      <h4 className='tituloLayout' >Nueva venta</h4>

      {cliente ?
        <div className='contClienteSeleccionado'>
          <hr />
          <h4>Cliente seleccionado:</h4>
          <div className='flex'>
            <div className='datosCliente'>
              <h4>Nombre:<span>{cliente.nombre}</span></h4>
              <h4>Apellido:<span>{cliente.apellido}</span></h4>
              <h4>Celular:<span>{cliente.celular}</span></h4>
            </div>
            <button onClick={() => resetearCliente()} className='btnResetearCliente'>Cambiar</button>
          </div>
        </div>
        : <div className='contBusquedaCliente'>
          <hr />
          <h4>Agregue el cliente.</h4>

          <div className='search'>
            <img className='lupita' src="/icons-app/lupita.png" alt="lupita" />
            <input
              className='inputFiltro'
              name='search'
              type="text"
              placeholder='Buscar por nombre o apellido'
              value={termino}
              onChange={handleSearch}
            />
          </div>

          {listar &&
            <div className='listadoDinamicoClientes'>
              {elementosFiltrados.length <= 0 ? (
                <p>Sin resultados</p>
              ) : (
                <ul>
                  {elementosFiltrados.slice(0, 5).map(cliente => (
                    <li onClick={() => setCliente(cliente)} key={cliente.id}>
                      {cliente.nombre} {cliente.apellido}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          }
        </div>
      }

      <hr />

      <div className='contFormaDepago'>
        <h4>Agrege una forma de pago.</h4>
        <div>
          <select
            className='selectFormaDePago'
            name="formaDePago1" id="formaDePago"
            onChange={(e) => setIdFormaDePago(parseInt(e.target.value, 10))}
          >
            {
              formasDePago.map(f => {
                return (
                  <option key={f.id} value={f.id}>
                    {f.nombre.toUpperCase()}
                  </option>
                )
              })
            }
          </select>
        </div>
      </div>

      <hr />

      <div className='contProductos'>
        <h4>Agregue los productos al detalle.</h4>
        <div className='contBox'>
          {productos &&
            productos.map(p => {
              return (
                <div key={p.id} onClick={() => addProducto(p, 1)} className='boxProducto'>
                  <p>{p.nombre}</p>
                  <p><img src="/icons-app/plus.png" alt="" /></p>
                </div>
              )
            })
          }
        </div>

      </div>

      <div className='productosAgregados'>
        <div className='row-header'>
          <h5>NOMBRE</h5>
          <h5>CANTIDAD</h5>
          <h5>SUBTOTAL</h5>
          <h5>QUITAR</h5>
        </div>
        <div className='row-body'>
          {
            productosEnDetalle.map(p => {
              return (
                <ProductoVenta
                  key={p.id}
                  onCantidadChange={setCantidad}
                  onRemove={removeProducto}
                  id={p.id}
                  nombre={p.nombre}
                  precio={p.precio} />
              )
            })
          }
        </div>
        <div className='row-precioTotal'>
          <h4>Total: <span>$ {total}</span></h4>
        </div>
        <hr />
      </div>

      <div className='contBtn contEntradas'>
        <Link className='btnVolver' to={'/facturas'}>Volver</Link>
        <button onClick={cancelarFactura} className='btnCancelar' type="submit">Cancelar</button>
        <button onClick={handlerSubmit} className='btnGuardar' type="submit">Guardar</button>
      </div>
    </div >
  )
}