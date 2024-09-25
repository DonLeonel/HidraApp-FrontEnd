export const validarEntradasFacturaYDetalles = ({ cliente, idFormaDePago, productosEnDetalle }) => {
    const errors = []

    !cliente &&
        errors.push({ nombre: 'cliente', mensaje: 'Debe seleccionar un Cliente.' })

    !idFormaDePago &&
        errors.push({ nombre: 'formaDePago', mensaje: 'Debe seleccionar una forma de Pago.' })

    productosEnDetalle.length <= 0 &&
        errors.push({ nombre: 'productosEnDetalle', mensaje: 'Debe seleccionar al menos un producto.' })

    return errors
}

export const validarEntradasFactura = ({ cliente, idFormaDePago }) => {
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

