import { fetchDataService } from "../services/apiService";

const updateDetalles = async (idFactura, detalles, action) => {
    const urlSuffix = action === 'add' ? 'add_detalles' : 'remove_detalles'
    const requests = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(detalles)
        }

        const { data, error } = await fetchDataService({
            entity: 'factura',
            id: `${idFactura}/${urlSuffix}`,
            options
        })
    }
    await requests()
}


export const armarDetalles = async (idFactura, detallesFacturaAEditar, detallesFactura) => {
    const detallesARemover = []
    const detallesAAñadir = []

    try {
        // Recorrer los detalles de la factura a editar
        detallesFacturaAEditar.forEach(detalleA => {
            const detalleB = detallesFactura.find(detalle => detalle.idProducto === detalleA.producto.id)

            // Si el detalleB no existe en detallesFactura, agregar a detallesARemover
            if (!detalleB) {
                detallesARemover.push(detalleA.id)
            }
        });

        // Filtrar los detalles que están en detallesFactura pero no en detallesFacturaAEditar
        detallesFactura.forEach(detalleB => {
            const detalleA = detallesFacturaAEditar.find(detalle => detalle.producto.id === detalleB.idProducto)

            // Si el detalleA no existe, significa que es un nuevo producto añadido
            // O si el producto es el mismo pero la cantidad es diferente
            if (!detalleA || detalleA.cantidad !== detalleB.cantidad) {
                detallesAAñadir.push(detalleB)
            }
        })       
        detallesARemover.length > 0 && await updateDetalles(idFactura, detallesARemover, 'remove')
        detallesAAñadir.length > 0 && await updateDetalles(idFactura, detallesAAñadir, 'add')             

        return true
    } catch (error) {
        console.error('Error al armar detalles:', error)
        return false
    }
}