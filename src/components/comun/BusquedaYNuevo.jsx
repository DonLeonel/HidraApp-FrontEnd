import { Link } from "react-router-dom"
import { Role, RoutesPrivadas } from "../../utils"
import '../../styles/components/comun/busquedaYNuevo.css'
import { useSelector } from "react-redux"

export const BusquedaYNuevo = ({ placeholder, termino, handleSearch, textButton, to = RoutesPrivadas.NUEVO }) => {
    const userState = useSelector((state) => state.user)
    return (
        <div className='contBusquedaYNvo'>
            <div className='search'>
                <img className='lupita' src="/icons-app/lupita.png" alt="lupita" />
                <input
                    className='inputFiltro'
                    name='search'
                    type="text"
                    placeholder={placeholder}
                    value={termino}
                    onChange={handleSearch}
                />
            </div>
            {((userState.role === Role.USER &&
                (textButton === 'Nuevo Cliente' || textButton === 'Nueva Venta')) ||
                userState.role === Role.ADMIN) && (
                    <div className="contButtonNuevo">
                        <Link
                            className='btnNuevo'
                            to={to}
                        >
                            {textButton}
                        </Link>
                    </div>
                )}

        </div>
    )
}