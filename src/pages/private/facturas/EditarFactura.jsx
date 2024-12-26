import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductos } from '../../../hooks'
import { fetchDataService } from '../../../services'
import {
    ProductoVenta, ClienteFactura, ButtonVolver, ButtonActualizar,
    FormaPagoFactura, ProductosFactura, EstadoFactura
} from '../../../components'
import {
    sonIgualesLasFacturas, validarEntradasFactura,
    validarEntradasDetalles, sonIgualesLosDetalles
} from '../../../validations'
import { armarDetalles } from '../../../helpers'
import { formatARS, getEstadosEditarFactura, RoutesPrivadas } from '../../../utils'
import '../../../styles/pages/nuevaVenta.css'
import { useNavigate } from 'react-router-dom'

const EditarFactura = () => {

    const { id } = useParams()
    const [facturaAEditar, setFacturaAEditar] = useState(null)
    const [cliente, setCliente] = useState(null)
    const [idFormaDePago, setIdFormaDePago] = useState(null)
    const [estadoFactura, setEstadoFactura] = useState('')
    const [total, setTotal] = useState(0)

    const [entrega, setEntrega] = useState(null)

    const [errorsValidationFactura, setErrorsValidationFactura] = useState(null)
    const [errorsValidationDetalle, setErrorsValidationDetalle] = useState(null)

    const [mostrarBtnFactura, setMostrarBtnFactura] = useState(false);
    const [mostrarBtnDetalle, setMostrarBtnDetalle] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }
        const fetchInfo = async () => {
            const { data: factura, error } = await fetchDataService(
                { entity: 'factura', id, options }
            )

            if (error) {
                console.log(error)
            } else {
                setFacturaAEditar(factura)
                setCliente(factura.cliente)
                setIdFormaDePago(factura.formaDePago.id)
                setEstadoFactura(factura.estado)
                setEntrega(factura.entrega)
                factura.detallesFactura.forEach(d => addProducto(d.producto, d.cantidad))
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

    const handlerSubmitFactura = async (e) => {
        e.preventDefault()
        const errors = validarEntradasFactura({ cliente, idFormaDePago, entrega })

        if (errors.length <= 0) {
            const factura = {
                idCliente: cliente.id,
                idFormaDePago: idFormaDePago,
                estado: estadoFactura,
                entrega
            }

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(factura)
            }
            const { data, error } = await fetchDataService(
                { entity: 'factura', id: facturaAEditar.id, options }
            )
            error ? console.error(error) : data &&
                setMostrarBtnFactura(false)

        } else {
            setErrorsValidationFactura(errors);
        }
    }

    const handlerSubmitDetalle = async (e) => {
        e.preventDefault()
        const errors = validarEntradasDetalles({ productosEnDetalle })
        if (errors.length <= 0) {
            const detallesFactura = productosEnDetalle.map(p => {
                return {
                    idProducto: p.id,
                    cantidad: p.cantidad
                }
            })
            await armarDetalles(facturaAEditar.id, facturaAEditar.detallesFactura, detallesFactura) ?
                setMostrarBtnDetalle(false) :
                alert('No se pudo actualizar el detalle')

        } else {
            setErrorsValidationDetalle(errors)
        }
    }

    const handlerChangeFactura = () => {

        if (cliente) {
            !sonIgualesLasFacturas(facturaAEditar,
                { idCliente: cliente.id, idFormaDePago, estado: estadoFactura, entrega }) ?
                setMostrarBtnFactura(true) : setMostrarBtnFactura(false)
        } else {
            setMostrarBtnFactura(false)
        }
    }

    const handlerChangeDetalle = () => {
        if (productosEnDetalle.length > 0) {
            !sonIgualesLosDetalles(facturaAEditar.detallesFactura, productosEnDetalle) ?
                setMostrarBtnDetalle(true) : setMostrarBtnDetalle(false)
        } else {
            setMostrarBtnDetalle(false)
        }
    }

    return (
        facturaAEditar &&
        <>
            <div className='contEditarFactura borLayout'>
                <h4 className='tituloLayout' >Editar factura</h4>
                <hr />

                <ClienteFactura
                    setCliente={setCliente}
                    cliente={cliente}
                    onChange={handlerChangeFactura}
                />
                <div className='errorValidation'>
                    {errorsValidationFactura && errorsValidationFactura.map(e => {
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
                    onChange={handlerChangeFactura}
                />

                <hr />

                <EstadoFactura
                    estados={getEstadosEditarFactura()}
                    estadoFactura={estadoFactura}
                    setEstadoFactura={setEstadoFactura}
                    entrega={entrega}
                    setEntrega={setEntrega}
                    onChange={handlerChangeFactura}
                />

                <div className='errorValidation'>
                    {errorsValidationFactura && errorsValidationFactura.map(e => {
                        if (e.nombre == 'formaDePago') {
                            return (
                                <p key={e.nombre} >{e.mensaje}</p>
                            )
                        }
                    })}
                </div>

                {mostrarBtnFactura &&
                    <div className='contButtonActualizar'>
                        <ButtonActualizar
                            text='Actualizar Factura'
                            handlerSubmit={handlerSubmitFactura}
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

export default EditarFactura