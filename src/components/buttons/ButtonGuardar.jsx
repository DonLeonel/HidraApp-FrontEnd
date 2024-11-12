export const ButtonGuardar = ({ handlerSubmit, handlerClick = null }) => {

    return (
        <>
            {handlerClick ?
                <button
                    className='buttonGuardar'
                    type="submit"
                    onClick={handlerClick}
                >
                    Guardar
                </button>
                :
                <button
                    className='buttonGuardar'
                    type="submit"
                    onSubmit={handlerSubmit}
                >
                    Guardar
                </button>
            }
        </>
    )
}