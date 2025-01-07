export const getEstadosEditar = () => {
    return ['PAGADO', 'PENDIENTE', 'PARCIALMENTE_PAGADO',
        'VENCIDO', 'REEMBOLSADO', 'ESPERANDO_CONFIRMACION']
}
export const getEstadosNva = () => {
    return ['PAGADO', 'PENDIENTE', 'PARCIALMENTE_PAGADO', 'ESPERANDO_CONFIRMACION']
}

export const getClassNameEstado = (estado) => {
    switch (estado) {
        case 'PAGADO':
            return 'classPagado'
        case 'PENDIENTE':
            return 'classPendiente'
        case 'PARCIALMENTE_PAGADO':
            return 'classParcialmentePagado'
        case 'VENCIDO':
            return 'classVencido'
        case 'REEMBOLSADO':
            return 'classReembolsado'
        default:
            return 'ESPERANDO_CONFIRMACION'
    }
}