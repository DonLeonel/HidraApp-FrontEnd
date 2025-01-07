import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductos } from '../../../hooks'
import { fetchDataService } from '../../../services'
import {
  ProductoVenta, ClienteFactura, ButtonVolver, ButtonActualizar,
  FormaPagoFactura, ProductosFactura, EstadoFactura
} from '../../../components'
import {
  sonIgualesLasVentas,  validarEntradasDetalles, 
  sonIgualesLosDetalles,  validarEntradasVenta
} from '../../../validations'
import { armarDetallesVenta } from '../../../helpers'
import { formatARS, getEstadosEditar } from '../../../utils'
import '../../../styles/pages/nuevaVenta.css'

const EditarVenta = () => {

  const { id } = useParams()
  const [ventaAEditar, setVentaAEditar] = useState(null)
  const [cliente, setCliente] = useState(null)
  const [idFormaDePago, setIdFormaDePago] = useState(null)
  const [estado, setEstado] = useState('')
  const [total, setTotal] = useState(0)

  const [montoEntrega, setMontoEntrega] = useState(null)

  const [errorsValidationVenta, setErrorsValidationVenta] = useState(null)
  const [errorsValidationDetalle, setErrorsValidationDetalle] = useState(null)

  const [mostrarBtnVenta, setMostrarBtnVenta] = useState(false);
  const [mostrarBtnDetalle, setMostrarBtnDetalle] = useState(false);  

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    const options = {
      signal
    }
    const fetchInfo = async () => {
      const { data: venta, error } = await fetchDataService(
        { entity: 'venta', id, options }
      )

      if (error) {
        console.log(error)
      } else {
        setVentaAEditar(venta)
        setCliente(venta.cliente)
        setIdFormaDePago(venta.formaDePago.id)
        setEstado(venta.estado)
        setMontoEntrega(venta.montoEntrega)
        venta.detallesVenta.forEach(d => addProducto(d.producto, d.cantidad))
      }
    }
    fetchInfo()
    return () => abortController.abort()
  }, [])

  const { productosEnDetalle,
    setCantidad,
    removeProducto,
    addProducto
  } = useProductos()

  useEffect(() => {
    setTotal(productosEnDetalle
      .reduce((acum, p) => acum + p.precio * p.cantidad, 0))
    handlerChangeDetalle()
  }, [productosEnDetalle.cantidad, productosEnDetalle])

  const handlerSubmitVenta = async (e) => {
    e.preventDefault()
    const errors = validarEntradasVenta({ cliente, idFormaDePago, montoEntrega })

    if (errors.length <= 0) {
      const venta = {
        idCliente: cliente.id,
        idFormaDePago: idFormaDePago,
        estado,
        montoEntrega
      }

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta)
      }
      const { data, error } = await fetchDataService(
        { entity: 'venta', id: ventaAEditar.id, options }
      )
      error ? console.error(error) : data &&
        setMostrarBtnVenta(false)

    } else {
      setErrorsValidationVenta(errors);
    }
  }

  const handlerSubmitDetalle = async (e) => {
    e.preventDefault()
    const errors = validarEntradasDetalles({ productosEnDetalle })
    if (errors.length <= 0) {
      const detallesVenta = productosEnDetalle.map(p => {
        return {
          idProducto: p.id,
          cantidad: p.cantidad
        }
      })
      await armarDetallesVenta(ventaAEditar.id, ventaAEditar.detallesVenta, detallesVenta) ?
        setMostrarBtnDetalle(false) :
        alert('No se pudo actualizar el detalle')

    } else {
      setErrorsValidationDetalle(errors)
    }
  }

  const handlerChangeVenta = () => {

    if (cliente) {
      !sonIgualesLasVentas(ventaAEditar,
        { idCliente: cliente.id, idFormaDePago, estado, montoEntrega }) ?
        setMostrarBtnVenta(true) : setMostrarBtnVenta(false)
    } else {
      setMostrarBtnVenta(false)
    }
  }

  const handlerChangeDetalle = () => {
    if (productosEnDetalle.length > 0) {
      !sonIgualesLosDetalles(ventaAEditar.detallesVenta, productosEnDetalle) ?
        setMostrarBtnDetalle(true) : setMostrarBtnDetalle(false)
    } else {
      setMostrarBtnDetalle(false)
    }
  }

  return (
    ventaAEditar &&
    <>
      <div className='contEditarFactura borLayout'>
        <h4 className='tituloLayout' >Editar venta</h4>
        <hr />

        <ClienteFactura
          setCliente={setCliente}
          cliente={cliente}
          onChange={handlerChangeVenta}
        />
        <div className='errorValidation'>
          {errorsValidationVenta && errorsValidationVenta.map(e => {
            if (e.nombre == 'cliente') {
              return (
                <p key={e.nombre} >{e.mensaje}</p>
              )
            }
          })}
        </div>

        <hr />

        <FormaPagoFactura
          setIdFormaDePago={setIdFormaDePago}
          idFormaDePago={idFormaDePago}
          onChange={handlerChangeVenta}
        />

        <hr />

        <EstadoFactura
          estados={getEstadosEditar()}
          estadoFactura={estado}
          setEstadoFactura={setEstado}
          entrega={montoEntrega}
          setEntrega={setMontoEntrega}
          onChange={handlerChangeVenta}
        />

        <div className='errorValidation'>
          {errorsValidationVenta && errorsValidationVenta.map(e => {
            if (e.nombre == 'formaDePago') {
              return (
                <p key={e.nombre} >{e.mensaje}</p>
              )
            }
          })}
        </div>

        {mostrarBtnVenta &&
          <div className='contButtonActualizar'>
            <ButtonActualizar
              text='Actualizar Venta'
              handlerSubmit={handlerSubmitVenta}
            />
          </div>
        }
      </div>

      <div className='contEditarDetalle borLayout'>

        <ProductosFactura
          addProducto={addProducto}
        />

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
                    initCantidad={p.cantidad}
                    onChangeCantidad={setCantidad}
                    onChangeDetalle={handlerChangeDetalle}
                    onRemove={removeProducto}
                    id={p.id}
                    nombre={p.nombre}
                    precio={p.precio}
                  />
                )
              })
            }
          </div>
          <div className='total'>
            <h4>Total: <span>{formatARS(total)}</span></h4>
          </div>

          <div className='errorValidation'>
            {errorsValidationDetalle && errorsValidationDetalle.map(e => {
              if (e.nombre == 'productosEnDetalle') {
                return (
                  <p key={e.nombre} >{e.mensaje}</p>
                )
              }
            })}
          </div>
        </div>
        {mostrarBtnDetalle &&
          <div className='contButtonActualizar'>
            <ButtonActualizar
              text='Actualizar Detalle'
              handlerSubmit={handlerSubmitDetalle}
            />
          </div>
        }

        <div className='contButtonVolver'>
          <ButtonVolver />
        </div>
      </div >
    </>
  )
}

export default EditarVenta