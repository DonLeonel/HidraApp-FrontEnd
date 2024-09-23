import { useState, useEffect } from 'react';

export const useSearchDinamic = (array, palabrasClaves) => {
    const [termino, setTermino] = useState('')
    const [elementosFiltrados, setElementosFiltrados] = useState([])
    const [listar, setListar] = useState(false)

    useEffect(() => {
        if (termino.trim() === '') {
            setListar(false)
            setElementosFiltrados([])
        } else {
            setListar(true)
            const filtered = array.filter(Element =>
                palabrasClaves.some(key =>
                    Element[key] && Element[key].toLowerCase().includes(termino.toLowerCase())
                )
            );
            setElementosFiltrados(filtered)
        }
    }, [termino, array])

    const handleSearch = (e) => {
        setTermino(e.target.value)
    };

    const reset = () => {
        setTermino('')
        setListar(false)
    }

    return { termino, elementosFiltrados, listar, handleSearch, reset }
};
