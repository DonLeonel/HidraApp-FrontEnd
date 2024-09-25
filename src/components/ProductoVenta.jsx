import { useState, useEffect, useRef } from 'react'
import '../styles/components/productoVenta.css'
import { formatARS } from '../utils/formatoPrecios'

export const ProductoVenta = ({ id, nombre, precio, initCantidad = 1, onChangeCantidad, onChangeDetalle = null, onRemove }) => {

    const [cantidad, setCantidad] = useState(initCantidad)

    const isFirstRender = useRef(true);

    useEffect(() => {
        onChangeCantidad(id, cantidad)
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            onChangeDetalle && onChangeDetalle()
        }
    }, [cantidad])

    const handlerChangeCantidad = ({ target }) => {
        const value = target.value
        if (value === '' || value === '0') return
        setCantidad(parseInt(value, 10))
    }

    const precioXCantidad = cantidad * precio

    return (
        <div className='row'>
            <span>{nombre}</span>
            <input onChange={handlerChangeCantidad} value={cantidad} type='number' />
            <span>{formatARS(precioXCantidad)}</span>
            <button onClick={() => onRemove(id)}>
                <img src='/icons-app/basurero.png' alt="quitar" />
            </button>
        </div>
    )
}