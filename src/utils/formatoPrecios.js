export const formatARS = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Código de la moneda en pesos argentinos
    }).format(precio)    
}