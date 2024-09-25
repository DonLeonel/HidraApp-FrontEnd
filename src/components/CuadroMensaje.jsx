import '../styles/components/cuadroMensaje.css'

export const CuadroMensaje = ({ mensaje, nombreProducto, setMostrarMensaje }) => {

    return (
        <div className='contCuadro'>
            <div>
                <p>{mensaje}</p>
                <p><span>'{nombreProducto}'</span></p>
            </div>
            <div>
                <button onClick={() => setMostrarMensaje({ mostrar: false })}>
                    Aceptar
                </button>
            </div>
        </div>
    )
}
