import '../../styles/components/buttons/buttons.css'
import { store } from "../../redux/store"

export const ButtonGenerarPdf = ({ id }) => {
    
    const generarPDF = async (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;
        const { token } = store.getState().user;
    
        try {
            const abortController = new AbortController();
            const { signal } = abortController;
    
            const options = {
                signal,
                method: "GET",
                headers: {
                    "Accept": "application/pdf", // Indica que esperamos un PDF
                    "Authorization": `Bearer ${token}` // 🔹 Agregar token
                },
            };
    
            const response = await fetch(`${API_URL}factura/generar-pdf/${id}`, options);            
            
            if (!response.ok) {
                throw new Error();
            }    
            // Convertir la respuesta en un Blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            // Crear un enlace y simular el clic para descargar automáticamente
            const a = document.createElement("a");
            a.href = url;
            a.download = `factura_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
    
            // Liberar la URL creada
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error descargando el PDF:", error);
        }
    };
    return (
        <button
            onClick={generarPDF}
            className="btnGenerarPDF"
        >
            Generar PDF
        </button>
    )
}