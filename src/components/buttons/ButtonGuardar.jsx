export const ButtonGuardar = ({ handlerSubmit }) => {

    return (
        <button
            className='buttonGuardar'
            type="submit"
            onSubmit={handlerSubmit}
        >
            Guardar
        </button>
    )
}