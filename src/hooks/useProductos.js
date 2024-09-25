import { useState } from 'react';

export const useProductos = () => {
    const [productosEnDetalle, setProductosEnDetalle] = useState([])

    const setCantidad = (id, cantidad) => {             
        setProductosEnDetalle(prevState =>
            prevState.map(p =>
                p.id === id ? { ...p, cantidad } : p
            )
        )       
    }    

    const removeProducto = (id) => {
        setProductosEnDetalle(prevState => prevState.filter(p => p.id !== id))
    }

    const addProducto = (producto, cantidad) => {
        productosEnDetalle && setProductosEnDetalle(prevState => {
            if (prevState.find(p => p.id === producto.id)) {
                return [...prevState]
            } else {
                return [...prevState, { ...producto, cantidad }]
            }
        })
    }

    return {
        productosEnDetalle,
        setCantidad,
        removeProducto,
        addProducto,
        setProductosEnDetalle
    }
}