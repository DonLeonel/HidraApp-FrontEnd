import { useState, useEffect, useRef } from 'react'
import {
  ProductoVenta, ClienteVenta, FormaPagoVenta,
  ProductosVenta, CuadroMensaje, EstadoVenta,
  ButtonCancelar, ButtonGuardar, ButtonVolver
} from '../../../components'
import { useProductos } from '../../../hooks'
import { fetchDataService } from '../../../services'
import { validarEntradasVentaYDetalles } from '../../../validations'
import { formatARS, getEstadosNva, RoutesPrivadas } from '../../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import '../../../styles/pages/nuevaVenta.css'
import '../../../styles/components/comun/validations.css'

const NuevaVenta = () => {

  const [cliente, setCliente] = useState(null)
  const [idFormaDePago, setIdFormaDePago] = useState(null)
  const [estado, setEstado] = useState('ESPERANDO_CONFIRMACION')
  const [total, setTotal] = useState(0)
  const [montoEntrega, setMontoEntrega] = useState(null)
  const [errorsValidation, setErrorsValidation] = useState(null)
  const [sinStock, setSinStock] = useState({ mostrar: false, nombreProducto: '' })
  const navigate = useNavigate()
  const clienteVentaRef = useRef()

  const { id } = useParams(null)

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

  const cancelarVenta = () => {
    setEstado('ESPERANDO_CONFIRMACION')
    setMontoEntrega(null)
    setIdFormaDePago(null)
    setProductosEnDetalle([]);
    setErrorsValidation(null)
    clienteVentaRef.current && clienteVentaRef.current.resetCliente()
  }

  const handlerClick = async (e) => {
    e.preventDefault()

    const errors = validarEntradasVentaYDetalles(
      { cliente, idFormaDePago, productosEnDetalle, montoEntrega }
    )   

    if (errors.length <= 0) {
      setErrorsValidation(null)
      const venta = {
        idCliente: cliente.id,
        idFormaDePago,
        estado,
        montoEntrega,
        detallesVenta:
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
        body: JSON.stringify(venta)
      }
      const { data, error } = await fetchDataService(
        { entity: 'venta', options }
      )
      if (error) {
        const msjError = error.split('*')[1]
        const nombreProducto = error.split("'")[1]
        const errorConst = 'No hay stock'

        if (msjError === errorConst) {
          setSinStock({
            mostrar: true,
            nombreProducto
          })
        } else {
          console.error(error)
        }
      }
      data && navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.VENTAS}`, { replace: true })
    } else {
      setErrorsValidation(errors)
    }
  }

  return (
    <div className='contNuevaVenta borLayout'>
      <h4 className='tituloLayout'>Nueva venta</h4>
      <hr />

      {sinStock.mostrar &&
        <CuadroMensaje
          setMostrarMensaje={setSinStock}
          mensaje={'No hay stock disponible de'}
          nombreProducto={sinStock.nombreProducto}
        />
      }

      <ClienteVenta
        idCliente={id}
        setCliente={setCliente}
        cliente={cliente}
        ref={clienteVentaRef}
      />

      <div className='errorValidation'>
        {errorsValidation && errorsValidation.map(e => {
          if (e.nombre == 'cliente') {
            return (
              <p key={e.nombre} >{e.mensaje}</p>
            )
          }
        })}
      </div>

      <hr />

      <FormaPagoVenta
        setIdFormaDePago={setIdFormaDePago}
        idFormaDePago={idFormaDePago}
      />

      <div className='errorValidation'>
        {errorsValidation && errorsValidation.map(e => {
          if (e.nombre == 'formaDePago') {
            return (
              <p key={e.nombre} >{e.mensaje}</p>
            )
          }
        })}
      </div>

      <hr />

      <ProductosVenta
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
                  onChangeCantidad={setCantidad}
                  onRemove={removeProducto}
                  id={p.id}
                  nombre={p.nombre}
                  precio={p.precio} />
              )
            })
          }
        </div>
        <div className='total'>
          <h4>Total: <span>{formatARS(total)}</span></h4>
        </div>
        <div className='errorValidation'>
          {errorsValidation && errorsValidation.map(e => {
            if (e.nombre == 'productosEnDetalle') {
              return (
                <p key={e.nombre} >{e.mensaje}</p>
              )
            }
          })}
        </div>
        <hr />
      </div>

      <EstadoVenta
        estados={getEstadosNva()}
        estadoVenta={estado}
        setEstadoVenta={setEstado}
        setMontoEntrega={setMontoEntrega}
        montoEntrega={montoEntrega}
      />

      <div className='errorValidation'>
        {errorsValidation && errorsValidation.map(e => {
          if (e.nombre == 'montoEntrega') {
            return (
              <p key={e.nombre} >{e.mensaje}</p>
            )
          }
        })}
      </div>

      <hr />

      <div className='contButtonVolverCancelarGuardar'>
        <ButtonVolver />
        <ButtonCancelar handlerClick={cancelarVenta} />
        <ButtonGuardar handlerClick={handlerClick} />
      </div>
    </div >
  )
}

export default NuevaVenta