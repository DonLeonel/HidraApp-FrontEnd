import { Link } from "react-router-dom"
import { RoutesPrivadas } from "../../utils/router"

export const ButtonCrearFactura = ({facturaACrear}) => {      
    return (
        <Link
            className="buttonCrearFactura"
            to={`/${RoutesPrivadas.PRIVATE}/${RoutesPrivadas.FACTURAS}/${RoutesPrivadas.CONFIRMAR}`}
            state={facturaACrear}
        >
            Continuar
        </Link>
    )
}