export const validarEntradasFactura = ({ cliente, idFormaDePago, productosEnDetalle }) => {
    const errors = []

    !cliente &&
        errors.push({ nombre: 'cliente', mensaje: 'Debe seleccionar un Cliente.' })

    !idFormaDePago &&
        errors.push({ nombre: 'formaDePago', mensaje: 'Debe seleccionar una forma de Pago.' })

    return errors
}

export const validarEntradasDetalles = ({ productosEnDetalle }) => {
    const errors = []    
    
    productosEnDetalle.length <= 0 &&
        errors.push({ nombre: 'productosEnDetalle', mensaje: 'Debe seleccionar al menos un producto.' })   

    return errors
}

export const sonIgualesLasFacturas = (facturaAEditar, facturaEditada) => {
    let ok = false
    if ((facturaAEditar.cliente.id === facturaEditada.idCliente)
        && (facturaAEditar.formaDePago.id === facturaEditada.idFormaDePago)) {
        ok = true
    }   
    return ok;
}

export const sonIgualesLosDetalles = (detallesFacturaAEditar, detallesFacturaEditada) => {
    let ok = false;
    if (detallesFacturaAEditar.length !== detallesFacturaEditada.length) {
        return ok
    }  

    ok = detallesFacturaAEditar.every(detalleA => {
        return detallesFacturaEditada.some(detalleB =>
            detalleA.idProducto === detalleB.idProducto && 
            detalleA.cantidad === detalleB.cantidad
        )
    })
    return ok    
}
