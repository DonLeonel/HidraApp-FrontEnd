import '../../styles/components/comun/cuadroMensaje.css'

export const CuadroMensaje = ({ mensaje, nombreProducto = null, setMostrarMensaje }) => {

    return (
        <div className='contCuadro'>
            <div>
                <p>{mensaje}</p>
                {nombreProducto && <p><span>'{nombreProducto}'</span></p>}
            </div>
            <div>
                <button onClick={() => setMostrarMensaje({ mostrar: false })}>
                    Aceptar
                </button>
            </div>
        </div>
    )
}
