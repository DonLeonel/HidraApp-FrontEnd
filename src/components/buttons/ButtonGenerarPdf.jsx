import '../../styles/components/buttons/buttons.css'

export const ButtonGenerarPdf = () => {

    const generarPDF = (e) => {
        e.preventDefault();

    }
    return (
        <button
            onClick={generarPDF}
            className="btnGenerarPDF"
        >
            Generar PDF
        </button>
    )
}