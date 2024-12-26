export const ButtonActualizar = ({ text = 'Actualizar', handlerSubmit }) => {
    return (
        <button
            className='buttonGuardar'
            type="submit"
            onClick={handlerSubmit}
        >
            {text}
        </button>
    )
}