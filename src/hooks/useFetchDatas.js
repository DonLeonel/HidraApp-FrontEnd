import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

export const useFetchDatas = (urlBase) => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [formasDePago, setFormasDePago] = useState([]);

    // Fetch de productos
    const { data: dataProductos, loading: loadingProductos, error: errorProductos } = useFetch(`${urlBase}producto?page=0&size=10`);
    useEffect(() => {
        if (!errorProductos) {
            !loadingProductos && setProductos(dataProductos.content);
        } else {
            console.log(errorProductos);
        }
    }, [dataProductos, loadingProductos, errorProductos]);

    // Fetch de clientes
    const { data: dataClientes, loading: loadingClientes, error: errorClientes } = useFetch(`${urlBase}cliente?page=0&size=50`);
    useEffect(() => {
        if (!errorClientes) {
            !loadingClientes && setClientes(dataClientes.content);
        } else {
            console.log(errorClientes);
        }
    }, [dataClientes, loadingClientes, errorClientes]);

    // Fetch de formas de pago
    const { data: dataFormasPago, loading: loadingFormasPago, error: errorFormasPago } = useFetch(`${urlBase}forma-de-pago`);
    useEffect(() => {
        if (!errorFormasPago) {
            !loadingFormasPago && setFormasDePago(dataFormasPago);
        } else {
            console.log(errorFormasPago);
        }
    }, [dataFormasPago, loadingFormasPago, errorFormasPago]);

    return { clientes, productos, formasDePago, loadingClientes, loadingProductos, loadingFormasPago };
};
