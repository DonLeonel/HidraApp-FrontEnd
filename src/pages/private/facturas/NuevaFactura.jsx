import { useState, useEffect, useRef } from 'react'
import {
  ProductoVenta, ClienteFactura, FormaPagoFactura,
  ProductosFactura, CuadroMensaje, EstadoFactura,
  ButtonCancelar, ButtonGuardar, ButtonVolver
} from '../../../components'
import { useProductos } from '../../../hooks'
import { fetchDataService } from '../../../services'
import { validarEntradasFacturaYDetalles } from '../../../validations'
import { formatARS, getEstadosNvaFactura, RoutesPrivadas } from '../../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import '../../../styles/pages/nuevaVenta.css'
import '../../../styles/components/comun/validations.css'

const NuevaFactura = () => {

  const [cliente, setCliente] = useState(null)
  const [idFormaDePago, setIdFormaDePago] = useState(null)
  const [estadoFactura, setEstadoFactura] = useState('ESPERANDO_CONFIRMACION')
  const [total, setTotal] = useState(0)
  const [entrega, setEntrega] = useState(null)
  const [errorsValidation, setErrorsValidation] = useState(null)
  const [sinStock, setSinStock] = useState({ mostrar: false, nombreProducto: '' })
  const navigate = useNavigate()
  const clienteFacturaRef = useRef()

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

  const cancelarFactura = () => {
    setEstadoFactura('ESPERANDO_CONFIRMACION')
    setEntrega(null)
    setIdFormaDePago(null)
    setProductosEnDetalle([]);
    setErrorsValidation(null)
    clienteFacturaRef.current && clienteFacturaRef.current.resetCliente()
  }

  const handlerClick = async (e) => {
    e.preventDefault()

    const errors = validarEntradasFacturaYDetalles(
      { cliente, idFormaDePago, productosEnDetalle, entrega }
    )   

    if (errors.length <= 0) {
      setErrorsValidation(null)
      const factura = {
        idCliente: cliente.id,
        idFormaDePago,
        estado: estadoFactura,
        entrega,
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
      const { data, error } = await fetchDataService(
        { entity: 'factura', options }
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
      data && navigate(`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}`, { replace: true })
    } else {
      setErrorsValidation(errors)
    }
  }

  return (
    <div className='contNuevaVenta borLayout'>
      <h4 className='tituloLayout' >Nueva venta</h4>
      <hr />

      {sinStock.mostrar &&
        <CuadroMensaje
          setMostrarMensaje={setSinStock}
          mensaje={'No hay stock disponible de'}
          nombreProducto={sinStock.nombreProducto}
        />
      }

      <ClienteFactura
        idCliente={id}
        setCliente={setCliente}
        cliente={cliente}
        ref={clienteFacturaRef}
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

      <FormaPagoFactura
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

      <EstadoFactura
        estados={getEstadosNvaFactura()}
        estadoFactura={estadoFactura}
        setEstadoFactura={setEstadoFactura}
        setEntrega={setEntrega}
        entrega={entrega}
      />

      <div className='errorValidation'>
        {errorsValidation && errorsValidation.map(e => {
          if (e.nombre == 'estadoFactura') {
            return (
              <p key={e.nombre} >{e.mensaje}</p>
            )
          }
        })}
      </div>

      <hr />

      <div className='contButtonVolverCancelarGuardar'>
        <ButtonVolver />
        <ButtonCancelar handlerClick={cancelarFactura} />
        <ButtonGuardar handlerClick={handlerClick} />
      </div>
    </div >
  )
}

export default NuevaFactura