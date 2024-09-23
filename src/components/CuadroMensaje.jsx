import '../styles/components/cuadroMensaje.css'

export const CuadroMensaje = ({ setMostrarMensaje }) => {

    return (
        <div className='contCuadro'>
            <p>Los datos permanecen sin cambios.</p>

            <div>
                <button onClick={() => setMostrarMensaje(false)}>
                    Aceptar
                </button>
            </div>
        </div>
    )
}
