import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchDataService } from '../../../services'
import { Role, formatARS, getClassNameEstado } from '../../../utils'
import { useSelector } from 'react-redux'
import { ButtonVolver, Loading } from '../../../components'
import '../../../styles/pages/detalleFactura.css'

const DetalleFactura = () => {

    return (
        <div>detalle factura</div>
    )
}

export default DetalleFactura