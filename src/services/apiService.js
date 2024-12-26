import { store } from "../redux/store"
const API_URL = import.meta.env.VITE_API_URL

export const fetchDataPaginatedService = async ({ entity, paginate, options}) => {    
    try {
        const url = `${API_URL}${entity}?page=${paginate.page}&size=${paginate.size}`
        const { data, error } = await fetchData({ url, options})
        if (error) {
            throw new Error(`Error al recuperar la información de ${entity}: ${error}`)
        }
        const { content } = data
        return { content, error: null }
    } catch (error) {
        return { content: null, error: error.message || 'Error desconocido' }
    }
}

export const fetchDataService = async ({ entity, id = null, options}) => {
    try {
        const url = id ? `${API_URL}${entity}/${id}` : `${API_URL}${entity}`
        const { data, error } = await fetchData({ url, options })
        if (error) {
            throw new Error(error)
        }
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.message || 'Error desconocido' }
    }
}

// Configura los headers de la solicitud
const configureOptions = (options, token) => {
    const headers = options.headers || {};
    if (!headers['Authorization'] && token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return { ...options, headers };
};

// Maneja la respuesta HTTP y lanza errores si es necesario
const parseResponse = async (response) => {
    if (!response.ok) {
        let errorDetails = {};
        try {
            errorDetails = await response.json();
        } catch {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const { code, status, message, errors } = errorDetails;

        if (code === 400 && errors) {
            throw new Error(
                `\nStatus Code ${code} - ${status} -\n${errors.join('\n')}`
            );
        }

        throw new Error(`\nStatus ${status} - ${message || 'Unexpected error'}`);
    }

    return response.json();
};

// Maneja errores comunes como problemas de conexión o abortos
const handleFetchError = (error) => {
    if (error.name === 'AbortError') {
        return { data: null, error: 'Fetch aborted' };
    }

    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return { data: null, error: 'No se pudo conectar al servidor. (ERR_CONNECTION_REFUSED)' };
    }

    return { data: null, error };
};

// Método principal para realizar fetch
const fetchData = async ({ url, options = {} }) => {
    const { token } = store.getState().user;

    try {
        const configuredOptions = configureOptions(options, token);
        const response = await fetch(url, configuredOptions);
        const data = await parseResponse(response);
        return { data, error: null };
    } catch (error) {
        return handleFetchError(error);
    }
};



    /*const fetchData = async ({ url, options = {} }) => {
    const userState = store.getState().user;
    options.headers = options.headers || {};

    // Agrega el encabezado Authorization si no está ya presente
    if (!options.headers['Authorization'] && userState.token) {
        options.headers['Authorization'] = `Bearer ${userState.token}`;
    }     
    
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const errorJson = await response.json()
            if (errorJson.code == 400) {
                throw new Error(`\nStatus Code ${errorJson.code} - ${errorJson.status} -\n${errorJson.errors.join('\n')}`)
            }
            throw new Error(`\nStatus ${errorJson.status} - ${errorJson.message}`)
        } 
        const data = await response.json()   
               
        return { data, error: null }
    } catch (error) {
        if (error.name === 'AbortError') {
            return { data: null, error: 'Fetch aborted' }
        }
        return { data: null, error }
    }
} */ 