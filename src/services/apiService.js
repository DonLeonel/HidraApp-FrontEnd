const API_URL = import.meta.env.VITE_API_URL

export const fetchDataPaginatedService = async ({ entity, paginate, options = {} }) => {
    try {
        const url = `${API_URL}${entity}?page=${paginate.page}&size=${paginate.size}`
        const { data, error } = await fetchData({ url, options })
        if (error) {
            throw new Error(`Error al recuperar la información de ${entity}: ${error}`)
        }
        const { content } = data;
        return { content, error: null }
    } catch (error) {
        return { content: null, error: error.message || 'Error desconocido' }
    }
}

export const fetchDataService = async ({ entity, id = null, options = {} }) => {
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

const fetchData = async ({ url, options = {} }) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {            
            const errorJson = await response.json()
            if (errorJson.code == 400) {
                throw new Error(`\nStatus Code ${errorJson.code} - ${errorJson.status} -\n${errorJson.errors.join('\n')}`)
            }
            throw new Error(`\nStatus ${errorJson.status} - ${errorJson.message}`);
        }
        
        const data = await response.json();                        

        return { data, error: null }
    } catch (error) {
        if (error.name === 'AbortError') {
            return { data: null, error: 'Fetch aborted' }
        }
        return { data: null, error }
    }
}  