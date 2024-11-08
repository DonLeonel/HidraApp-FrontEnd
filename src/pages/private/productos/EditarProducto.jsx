import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useForm } from '../../../hooks';
import { fetchDataService } from '../../../services';

const EditarProducto = () => {

    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: producto, error } = await fetchDataService(
                { entity: 'producto', id, options }
            )

            if (error) {
                console.log(error)
            } else {
                setProducto({
                    id: producto.id,
                    nombre: producto.nombre,
                    idCategoria: producto.categoria.id,
                    descripcion: producto.descripcion,
                    stock: producto.stock,
                    precio: producto.precio
                })
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const options = {
            signal
        }

        const fetchInfo = async () => {
            const { data: categorias, error } = await fetchDataService(
                { entity: 'categoria', options }
            )

            if (error) {
                console.log(error)
            } else {
                setCategorias(categorias)
            }
        }
        fetchInfo()
        return () => abortController.abort()
    }, [])

    const { formState, onInputChange } = useForm(producto)

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const producto = {
            ...formState,
            idCategoria: parseInt(formState.idCategoria, 10)
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }
        const { data, error } = await fetchDataService({ entity: 'producto', id: formState.id, options })
        error ? console.error(error) : data && (window.location.href = '/productos')
    }

    return (
        <div className='contDetalleProducto borLayout'>
            <h4 className='tituloLayout'>Editar producto</h4>

            {
                formState &&
                <form onSubmit={handlerSubmit} className='formNvo' id='formulario'>
                    <div className='contEntradas'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            name='nombre'
                            type="text"
                            onChange={onInputChange}
                            value={formState.nombre}
                        />
                    </div>

                    <div className='contEntradas'>
                        <label htmlFor="categoria">Categoria</label>
                        <select
                            className='select'
                            name="idCategoria"
                            id="categoria"
                            onChange={onInputChange}
                            value={formState.idCategoria}
                        >
                            {
                                categorias &&
                                categorias.map((c) => {
                                    return (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    )
                                })}
                        </select>
                    </div>

                    <div className='contEntradas'>
                        <label htmlFor="descripcion">Descripcion</label>
                        <input
                            name='descripcion'
                            type="text"
                            onChange={onInputChange}
                            value={formState.descripcion}
                        />
                    </div>

                    <div className='contEntradas'>
                        <label htmlFor="stock">Stock</label>
                        <input
                            name='stock'
                            type="number"
                            onChange={onInputChange}
                            value={formState.stock}
                        />
                    </div>

                    <div className='contEntradas'>
                        <label htmlFor="precio">Precio</label>
                        <input
                            name='precio'
                            type="number"
                            onChange={onInputChange}
                            value={formState.precio}
                        />
                    </div>

                    <div className='contBtn contEntradas'>
                        <Link className='btnVolver' to={'/productos'}>Volver</Link>
                        <button className='btnGuardar' type="submit">Guardar</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default EditarProducto