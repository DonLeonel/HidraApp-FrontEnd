import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react"
import { useSearchDinamic } from "../../hooks"
import { fetchDataPaginatedService, fetchDataService } from "../../services"
import '../../styles/components/ventas/clienteVenta.css'

export const ClienteVenta = forwardRef(({ idCliente = null, setCliente, cliente, onChange = null }, ref) => {

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
        if (idCliente) {

            const fetchInfo = async () => {
                const { data: cliente, error } = await fetchDataService(
                    { entity: `cliente/${idCliente}`, options }
                )
                error ? console.log(error) : setCliente(cliente)
            }
            fetchInfo()
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
        cliente && onChange && onChange()
    }, [cliente])

    return (
        cliente ?
            <div className='contClienteSeleccionado'>
                <h4 className="tituloComponent">Cliente seleccionado:</h4>
                <div className='flex'>
                    <div className='datosClienteVenta'>
                        <h4>Nombre: <span>{cliente.nombre}</span></h4>
                        <h4>Apellido: <span>{cliente.apellido}</span></h4>
                        <h4>Celular: <span>{cliente.celular}</span></h4>
                    </div>
                    <button
                        onClick={resetCliente}
                        className='btnResetearCliente'
                    >
                        Cambiar
                    </button>
                </div>
            </div>
            :

            <div className='contBusquedaCliente'>
                <h4 className="tituloComponent">Agregue un cliente.</h4>
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