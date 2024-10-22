export const obtenerFechaActual = () => {
    let fechaActual = new Date();
    return `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`
}