export const ButtonCancelar = ({ handlerClick }) => {
    return (
        <button
            className='buttonCancelar'
            type="submit"
            onClick={handlerClick}
        >
            Cancelar
        </button>
    )
}