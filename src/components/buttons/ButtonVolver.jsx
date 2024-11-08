import { useNavigate } from "react-router-dom";
import '../../styles/components/buttons/buttons.css'

export const ButtonVolver = () => {
    const navigate = useNavigate()

    const handleBack = (e) => {
        e.preventDefault()
        navigate(-1); // Esto te lleva a la página anterior
    }

    return (
        <button
            onClick={handleBack}
            className='buttonVolver'
        >
            Volver
        </button>
    )
}