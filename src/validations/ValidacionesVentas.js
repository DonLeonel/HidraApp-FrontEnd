export const validarEntradasVentaYDetalles = ({ cliente, idFormaDePago, productosEnDetalle, montoEntrega }) => {
    const errors = []

    !cliente &&
        errors.push({ nombre: 'cliente', mensaje: 'Debe seleccionar un Cliente.' })

    !idFormaDePago &&
        errors.push({ nombre: 'formaDePago', mensaje: 'Debe seleccionar una forma de Pago.' })

    productosEnDetalle.length <= 0 &&
        errors.push({ nombre: 'productosEnDetalle', mensaje: 'Debe seleccionar al menos un producto.' })

    if (montoEntrega == '') {
        montoEntrega <= 0 &&
            errors.push({ nombre: 'montoEntrega', mensaje: 'El monto de entrega debe ser Mayor a Cero.' })
    }

    return errors
}

export const validarEntradasVenta = ({ cliente, idFormaDePago }) => {
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

export const sonIgualesLasVentas = (ventaAEditar, VentaEditada) => {
    let ok = false
    
    if ((ventaAEditar.cliente.id === VentaEditada.idCliente)
        && (ventaAEditar.formaDePago.id === VentaEditada.idFormaDePago)
        && (ventaAEditar.estado === VentaEditada.estado)
        && (ventaAEditar.montoEntrega == VentaEditada.montoEntrega)) {
        ok = true
    }   

    return ok;
}

export const sonIgualesLosDetalles = (detallesFacturaAEditar, detallesFacturaEditada) => {
    if (detallesFacturaAEditar.length !== detallesFacturaEditada.length) {
        return false;
    }
    // Ordenar ambos arrays por idProducto para asegurar que el orden no afecte la comparación
    const sortedA = [...detallesFacturaAEditar].sort((a, b) => a.idProducto - b.idProducto);
    const sortedB = [...detallesFacturaEditada].sort((a, b) => a.idProducto - b.idProducto);

    // Comparar cada elemento de los arrays
    return sortedA.every((detalleA, index) => {
        const detalleB = sortedB[index];
        return detalleA.idProducto === detalleB.idProducto && detalleA.cantidad === detalleB.cantidad;
    });
};

