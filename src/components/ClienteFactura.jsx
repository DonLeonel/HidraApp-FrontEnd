import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react"
import { useSearchDinamic } from "../hooks"
import { fetchDataPaginatedService } from "../services/apiService"

export const ClienteFactura = forwardRef(({ setCliente, cliente, onChange = null }, ref) => {

    const paginate = { page: 0, size: 100 }
    const [clientes, setClientes] = useState([])

    const resetCliente = () => {
        setCliente(null)
        reset()
    }

    useImperativeHandle(ref, () => ({
        resetCliente
    }));  //para exponer el metodo al comp padre.

    const { termino,
        elementosFiltrados,
        listar,
        handleSearch,
        reset
    } = useSearchDinamic(clientes, ['nombre', 'apellido']);

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController

        const options = {
            signal
        }
        const fetchInfo = async () => {
            const { content: clientes, error } = await fetchDataPaginatedService(
                { entity: 'cliente', paginate, options }
            )
            error ? console.log(error) : setClientes(clientes)

        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {            
            isFirstRender.current = false;
            return;
        }
        cliente && handlerChange()    
    }, [cliente])

    const handlerChange = () => {       
        onChange && onChange()
    }

    return (
        cliente ?
            <div className='contClienteSeleccionado'>
                <h4>Cliente seleccionado:</h4>
                <div className='flex'>
                    <div className='datosCliente'>
                        <h4>Nombre: <span>{cliente.nombre}</span></h4>
                        <h4>Apellido: <span>{cliente.apellido}</span></h4>
                        <h4>Celular: <span>{cliente.celular}</span></h4>
                    </div>
                    <button onClick={resetCliente} className='btnResetearCliente'>Cambiar</button>
                </div>
            </div>

            :

            <div className='contBusquedaCliente'>
                <h4>Agregue el cliente.</h4>
                <div className='search'>
                    <img className='lupita' src="/icons-app/lupita.png" alt="lupita" />
                    <input
                        className='inputFiltro'
                        name='search'
                        type="text"
                        placeholder='Buscar por nombre o apellido'
                        value={termino}
                        onChange={handleSearch}
                    />
                </div>

                {listar && (
                    <div className='listadoDinamicoClientes'>
                        {elementosFiltrados.length <= 0 ? (
                            <p>Sin resultados</p>
                        ) : (
                            <ul>
                                {elementosFiltrados.slice(0, 5).map(cliente => (
                                    <li onClick={() => setCliente(cliente)} key={cliente.id}>
                                        {cliente.nombre} {cliente.apellido}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
    )
})