import { useState } from 'react'
import '../styles/components/productoVenta.css'
import { useEffect } from 'react'

export const ProductoVenta = ({ id, nombre, precio, initCantidad = 1, onChangeCantidad, onChangeDetalle, onRemove }) => {

    const [cantidad, setCantidad] = useState(initCantidad)

    useEffect(() => {
        onChangeCantidad(id, cantidad)
    }, [cantidad])

    const handlerChangeCantidad = ({ target }) => {
        onChangeDetalle()
        const value = target.value
        if (value === '' || value === '0') return
        setCantidad(parseInt(value, 10))
    }

    const precioXCantidad = cantidad * precio

    return (
        <div className='row'>
            <span>{nombre}</span>
            <input onChange={handlerChangeCantidad} value={cantidad} type='number' />
            <span>$ {precioXCantidad}</span>
            <button onClick={() => onRemove(id)}>
                <img src='/icons-app/basurero.png' alt="quitar" />
            </button>
        </div>
    )
}