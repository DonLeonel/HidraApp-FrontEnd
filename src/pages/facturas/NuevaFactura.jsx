import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ProductoVenta,
  ClienteFactura,
  FormaPagoFactura,
  ProductosFactura,
  CuadroMensaje
} from '../../components/index'
import { useProductos } from '../../hooks/index'
import { fetchDataService } from '../../services/apiService'
import '../../styles/pages/nuevaVenta.css'
import { validarEntradasFacturaYDetalles } from '../../utils/ValidacionesFactura'
import { formatARS } from '../../utils/formatoPrecios'

export const NuevaFactura = () => {

  const [cliente, setCliente] = useState(null)
  const [idFormaDePago, setIdFormaDePago] = useState(null)
  const [total, setTotal] = useState(0)

  const [errorsValidation, setErrorsValidation] = useState(null)
  const [sinStock, setSinStock] = useState({ mostrar: false, nombreProducto: '' })

  const clienteFacturaRef = useRef()
  const { id } = useParams(null) 
  const navigate = useNavigate() 

  const handleBack = () => {
    navigate(-1); // Esto te lleva a la página anterior
  };
  
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
    setIdFormaDePago(null)
    setProductosEnDetalle([]);
    setErrorsValidation(null)
    clienteFacturaRef.current && clienteFacturaRef.current.resetCliente()
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()

    const errors = validarEntradasFacturaYDetalles(
      { cliente, idFormaDePago, productosEnDetalle }
    )

    if (errors.length <= 0) {
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
      data && (window.location.href = '/facturas')
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
        <div className='row-precioTotal'>
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

      <div className='contBtn contEntradas'>
        <button onClick={handleBack} className='btnVolver' >Volver</button>
        <button onClick={cancelarFactura} className='btnCancelar' type="submit">Cancelar</button>
        <button onClick={handlerSubmit} className='btnGuardar' type="submit">Guardar</button>
      </div>
    </div >
  )
}