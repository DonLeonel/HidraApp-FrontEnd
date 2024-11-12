export const ButtonVerOcultar = ({ text, handleVerOcultar, ver }) => {

    return (
        <div className='contButtonVerOcultar'>
            <button
                className='buttonVerOcultar'
                onClick={handleVerOcultar}
            >
                {ver ? `Ocultar ${text}` : `Ver ${text}`}
            </button>
        </div>
    )
}