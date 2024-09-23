
import { useState, useEffect } from 'react';

export const useEliminar = (entidad, url) => {
    const [deseaBorrar, setDeseaBorrar] = useState(false);
    const [mostrarDialogo, setMostrarDialogo] = useState(false);
    const [idEntidadABorrar, setIdEntidadABorrar] = useState(null);

    const iniciarEliminacion = (id) => {
        setMostrarDialogo(true);
        setIdEntidadABorrar(id);
    };

    useEffect(() => {
        if (deseaBorrar && idEntidadABorrar !== null) {
            /*fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }                
            })
            .then(response => response.json())
            .then(data => {                
                console.log('Cliente eliminado', data);                
            })
            .catch(error => {
                console.error('Error al eliminar el '+ entidad, error);
            })
            .finally(() => {
                setMostrarDialogo(false)
                setDeseaBorrar(false)
                setIdEntidadABorrar(null)
            });
            */
            console.log(idEntidadABorrar);
            setMostrarDialogo(false)
            setDeseaBorrar(false)
            setIdEntidadABorrar(null)
        }
    }, [deseaBorrar, idEntidadABorrar])


    return {
        iniciarEliminacion,
        mostrarDialogo,
        setDeseaBorrar,
        setMostrarDialogo
    }
}
