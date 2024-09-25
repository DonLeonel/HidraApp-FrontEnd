import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductos } from '../../hooks/index'
import { fetchDataService } from '../../services/apiService'
import {
    ProductoVenta,
    ClienteFactura,
    FormaPagoFactura,
    ProductosFactura
} from '../../components/index'
import {
    sonIgualesLasFacturas,
    validarEntradasFactura,
    validarEntradasDetalles,
    sonIgualesLosDetalles
} from '../../utils/ValidacionesFactura'
import '../../styles/pages/nuevaVenta.css'
import { armarDetalles } from '../../utils/DetallesHelper'
import { formatARS } from '../../utils/formatoPrecios'

export const EditarFactura = () => {

    const { id } = useParams()
    const [facturaAEditar, setFacturaAEditar] = useState(null)
    const [cliente, setCliente] = useState(null)
    const [idFormaDePago, setIdFormaDePago] = useState(null)
    const [total, setTotal] = useState(0)

    const [errorsValidationFactura, setErrorsValidationFactura] = useState(null)
    const [errorsValidationDetalle, setErrorsValidationDetalle] = useState(null)

    const [mostrarBtnFactura, setMostrarBtnFactura] = useState(false);
    const [mostrarBtnDetalle, setMostrarBtnDetalle] = useState(false);

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
    }, [productosEnDetalle])

    const handlerSubmitFactura = async (e) => {
        e.preventDefault()

        const errors = validarEntradasFactura({ cliente, idFormaDePago })

        if (errors.length <= 0) {
            const factura = {
                idCliente: cliente.id,
                idFormaDePago: idFormaDePago
            }

            if (!sonIgualesLasFacturas(facturaAEditar, factura)) {
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
                    (window.location.href = `/editar-factura/${data.id}`)
            } else {
                setMostrarBtnFactura(true)
            }
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
            (window.location.href = `/editar-factura/${facturaAEditar.id}`) :
            alert('No se pudo actualizar el detalle')

        } else {
            setErrorsValidationDetalle(errors)
        }
    }

    const handlerChangeFactura = () => {
        if (cliente) {
            !sonIgualesLasFacturas(facturaAEditar, { idCliente: cliente.id, idFormaDePago }) ?
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
                    <div className='contBtn contEntradas'>
                        <button onClick={handlerSubmitFactura} className='btnGuardar' type="submit">Actualizar Factura</button>
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
                    <div className='row-precioTotal'>
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
                    <div className='contBtn contEntradas'>
                        <button onClick={handlerSubmitDetalle} className='btnGuardar' type="submit">Actualizar Detalle</button>
                    </div>
                }

            </div >
            <div className='ContBtnVolver borLayout'>
                <Link className='btnVolverFactura' to={'/facturas'}>Volver</Link>
            </div>
        </>
    )
}