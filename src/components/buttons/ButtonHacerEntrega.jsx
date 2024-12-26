import '../../styles/components/buttons/buttons.css'

export const ButtonHacerEntrega = ({ setVerInputEntrega }) => {
    return (
        <button
            className="buttonHacerEntrega"
            onClick={setVerInputEntrega(true)}
        >
            Hacer Entrega
        </button>
    )
}