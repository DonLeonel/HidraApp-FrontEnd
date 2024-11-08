export const getClassNameStock = (stock) => {
    if(stock <= 10)return 'classStockMinimo'
    if(stock <= 20)return 'classStockMedio'
    if(stock <= 50)return 'classStockMedioAlto'
    if(stock <= 100)return 'classStockAlto'
    if(stock > 100)return 'classStockSobrado'
}