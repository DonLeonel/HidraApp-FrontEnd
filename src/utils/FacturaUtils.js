export const generarDetallesFactura = (ventasAFacturar) => {
    const detallesFactura = new Map()  
    ventasAFacturar?.forEach(({ detallesVenta }) => {
        detallesVenta.forEach(({ producto, cantidad, subTotal }) => {
            const { id, nombre, precio } = producto

            if (detallesFactura.has(id)) {
                // Si el producto ya existe, se suman las cantidades y el subtotal
                const productoExistente = detallesFactura.get(id)
                productoExistente.cantidad += cantidad
                productoExistente.subTotal += subTotal
            } else {
                // Si el producto no existe, se agrega normalmente
                detallesFactura.set(id, { id, nombre, precio, cantidad, subTotal })
            }
        })
    })

    return Array.from(detallesFactura.values())
}

export const formatoDetallesFacturas = (detllsFactura) => {
    const detallesFactura = new Map() 
    
    detllsFactura?.forEach(({ venta }) => {       
        
        venta.detallesVenta.forEach(({ producto, cantidad, subTotal }) => {
            const { id, nombre, precio } = producto          
                   
            if (detallesFactura.has(id)) {
                // Si el producto ya existe, se suman las cantidades y el subtotal
                const productoExistente = detallesFactura.get(id)
                productoExistente.cantidad += cantidad
                productoExistente.subTotal += subTotal
            } else {
                // Si el producto no existe, se agrega normalmente
                detallesFactura.set(id ,{ id, nombre, precio, cantidad, subTotal })                              
            }
        })
    })  
    
    return Array.from(detallesFactura.values())
}

export const calcularTotal = (detallesFactura) => {
    return detallesFactura.reduce((acum, dtll) => {
         return acum + dtll.subTotal
    }, 0)
}