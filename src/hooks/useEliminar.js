
import { useState, useEffect } from 'react';
import { fetchDataService } from '../services';

export const useEliminar = (entidad, { setRecargar }) => {
    const [deseaBorrar, setDeseaBorrar] = useState(false);
    const [mostrarDialogo, setMostrarDialogo] = useState(false);
    const [idEntidadABorrar, setIdEntidadABorrar] = useState(null);

    const iniciarEliminacion = (id) => {
        setMostrarDialogo(true);
        setIdEntidadABorrar(id);
    };

    useEffect(() => {
        if (deseaBorrar && idEntidadABorrar !== null) {

            const abortController = new AbortController()
            const { signal } = abortController

            const options = {
                signal,
                method: 'DELETE'
            }
            const fetchInfo = async () => {
                const { data, error } = await fetchDataService(
                    { entity: entidad, id: idEntidadABorrar, options }
                )
                setMostrarDialogo(false)
                setDeseaBorrar(false)
                setIdEntidadABorrar(null)
                alert(`Operacion exitosa, se elimino ${entidad}`)
                setRecargar(true)
            }
            fetchInfo()
            return () => {
                abortController.abort()
                setRecargar(false)
            }
        }
    }, [deseaBorrar, idEntidadABorrar])

    return {
        iniciarEliminacion,
        mostrarDialogo,
        setDeseaBorrar,
        setMostrarDialogo
    }
}
