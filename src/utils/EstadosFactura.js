export const getEstadosEditarFactura = () => {
    const estados = ['PAGADO', 'PENDIENTE', 'PARCIALMENTE_PAGADO',
        'VENCIDO', 'REEMBOLSADO', 'ESPERANDO_CONFIRMACION']

    return estados
}
export const getEstadosNvaFactura = () => {
    const estados = ['PAGADO', 'PENDIENTE', 'PARCIALMENTE_PAGADO', 'ESPERANDO_CONFIRMACION']

    return estados
}

export const getClassName = (estado) => {
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