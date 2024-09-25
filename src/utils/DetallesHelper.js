import { fetchDataService } from "../services/apiService";

const updateDetalles = async (idFactura, detalles, action) => {
    const urlSuffix = action === 'add' ? 'add_detalle' : 'remove_detalle';
    const requests = detalles.map(async d => {
        let options = {}
        if (action !== 'add') {
            options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(d)
            };
        }
        const { data, error } = await fetchDataService({
            entity: 'factura',
            id: `${idFactura}/${urlSuffix}${action === 'remove' ? '/' + d.id : ''}`,
            options
        });                         
    });

    await Promise.all(requests);
};

export const armarDetalles = async (idFactura, detallesFacturaAEditar, detallesFactura) => {
    const detallesARemover = [];
    const detallesAAñadir = [];

    try {
        // Recorrer los detalles de la factura a editar
        detallesFacturaAEditar.forEach(detalleA => {
            const detalleB = detallesFactura.find(detalle => detalle.idProducto === detalleA.producto.id);

            // Si el detalleB existe y la cantidad es diferente o no existe en detallesFactura
            if (!detalleB || detalleA.cantidad !== detalleB.cantidad) {
                detallesARemover.push(detalleA);
                detallesAAñadir.push(detalleB);
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

        // Actualizar detalles (remover y añadir)
        await updateDetalles(idFactura, detallesARemover, 'remove');        
        await updateDetalles(idFactura, detallesAAñadir, 'add');

        // Si todo salió bien
        return true; // Devuelve true si todo se completó correctamente
    } catch (error) {
        console.error('Error al armar detalles:', error);
        return false; // Devuelve false si ocurrió un error
    }
};
