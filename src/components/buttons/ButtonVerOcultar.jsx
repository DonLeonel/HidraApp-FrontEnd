export const ButtonVerOcultar = ({ text, handleVerOcultar, ver }) => {

    return (
        <button
            className='buttonVerOcultar'
            onClick={handleVerOcultar}
        >
            {ver ? `Ocultar ${text}` : `Ver ${text}`}
        </button>
    )
}