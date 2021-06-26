import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../../config/config";
import PoiForm from '../../components/PoiForm';

export default function Create() {

    const [pointOfInterest, setPointOfInterest] = useState({});

    function submit(e) {

        e.preventDefault(); // evito que se recargue el formulario por defecto

        const form = e.target;

        fetch(
            `${BASE_API_URL}/poi`,
            {
                method: 'POST',
                body: JSON.stringify(pointOfInterest),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                    // Intento llamar a este endpoint con las credenciales del usuario.
                    // Las credenciales las obtenemos en el Login.js a través de "token".
                }
            }
        ).then(response => {
            if (response.ok) {
                setPointOfInterest({}); // vaciamos el estado
                form.reset();           // vaciamos el formulario
                NotificationManager.success("Punto de interés añadido con éxito", "Éxito", 3000);
            } else {

                if (response.status >= 400 && response.status < 500) {
                    NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
            }
            /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
            es exitosa o no. */
        })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    }

    return (
        <div className="form-wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al añadir un nuevo punto de interés. */}

            <h1>Nuevo punto de interés</h1>
            <PoiForm onSubmit={submit} state={pointOfInterest} updateState={setPointOfInterest} />
        </div>);
}