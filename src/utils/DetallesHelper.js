import { fetchDataService } from "../services/apiService";

export const armarDetalles = (idFactura, detallesFacturaAEditar, detallesFactura) => {
    const detallesARemover = [];
    const detallesAAñadir = [];

    // Recorrer los detalles de la factura a editar
    detallesFacturaAEditar.forEach(detalleA => {
        const detalleB = detallesFactura.find(detalle => detalle.idProducto === detalleA.producto.id);

        // Si el detalleB existe y la cantidad es diferente o no existe en detallesFactura
        if (!detalleB || detalleA.cantidad !== detalleB.cantidad) {
            detallesARemover.push(detalleA);
            detallesAAñadir.push(detalleB)
        }
    });

    // Filtrar los detalles que están en detallesFactura pero no en detallesFacturaAEditar
    detallesFactura.forEach(detalleB => {
        const detalleA = detallesFacturaAEditar.find(detalle => detalle.producto.id === detalleB.idProducto);

        // Si el detalleA no existe, significa que es un nuevo producto añadido
        if (!detalleA) {
            detallesAAñadir.push(detalleB);
        }
    });

    removeDetalles(idFactura, detallesARemover)
    addDetalle(idFactura, detallesAAñadir)
};


const addDetalle = (idFactura, detallesAdd) => {
    console.log('Add detalles', detallesAdd);

    const armadoURL = `${idFactura}/add_detalle`

    detallesAdd.forEach(async d => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        }

        const { data, error } = await fetchDataService({ entity: 'factura', id: armadoURL, options })
        if (error) {
            console.log(error)
        }
    })
}

const removeDetalles = (idFactura, detallesRemove) => {
    console.log('remove detalles:', detallesRemove);

    detallesRemove.forEach(async d => {
        const options = {
            method: 'PATCH'
        }
        const armadoURL = `${idFactura}/remove_detalle/${d.id}`

        const { data, error } = await fetchDataService({ entity: 'factura', id: armadoURL, options })
        if (error) {
            console.log(error)
        }
    })
}
