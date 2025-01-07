import '../../styles/components/comun/cuadroMensajeEliminar.css'

export const CuadroMensajeEliminar = ({entidad, setDeseaBorrar, setMostrarDialogo}) => {
    return (
        <div className='cuadroMensaje'>
            <h4
                className='dialogo'
            >
                {`¿Esta seguro que desea eliminar ${entidad} de forma permanente?`}
            </h4>
            <div>
                <button onClick={() => setDeseaBorrar(true)} className='si'>Si</button>
                <button onClick={() => setMostrarDialogo(false)} className='no' defaultChecked>No</button>
            </div>
        </div>
    )
}