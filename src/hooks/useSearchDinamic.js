import { useState, useEffect } from 'react';

export const useSearchDinamic = (array, palabrasClaves, { esFactura = false } = false) => {
    const [termino, setTermino] = useState('')
    const [elementosFiltrados, setElementosFiltrados] = useState([])
    const [listar, setListar] = useState(false)

    useEffect(() => {
        if (termino.trim() === '') {
            setListar(false)
            setElementosFiltrados(array)
        } else {
            setListar(true)
            const filtered = array.filter(Element => {
                const porPalabrasClave = palabrasClaves.some(key =>
                    Element[key] && Element[key].toLowerCase().includes(termino.toLowerCase())
                )
                let porCliente = ''
                if (esFactura) {
                    // Combinar nombre y apellido del cliente
                    const nombreCompleto = `${Element.cliente.nombre} ${Element.cliente.apellido}`.toLowerCase()
                    porCliente = nombreCompleto.includes(termino.toLowerCase())
                }

                return porPalabrasClave || porCliente
            })
            setElementosFiltrados(filtered)
        }
    }, [termino, array])

    const handleSearch = ({ target }) => {
        setTermino(target.value)
    }

    const reset = () => {
        setTermino('')
        setListar(false)
    }

    return { termino, elementosFiltrados, listar, handleSearch, reset }
};
