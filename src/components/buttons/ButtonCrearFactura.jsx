import { Link } from "react-router-dom"
import { RoutesPrivadas } from "../../utils/router"
import '../../styles/components/buttons/buttons.css'

export const ButtonCrearFactura = ({facturaACrear}) => {      
    return (
        <Link
            className="buttonCrearFactura"
            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.CONFIRMAR}`}
            state={facturaACrear}
        >
            Confirmar
        </Link>
    )
}