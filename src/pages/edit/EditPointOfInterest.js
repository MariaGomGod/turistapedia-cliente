import { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../../config/config";
import PoiForm from '../../components/PoiForm';
import { useHistory, useParams } from 'react-router-dom';

export default function EditPointOfInterest() {

    const [edit, setEdit] = useState({});

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        fetch(`${BASE_API_URL}/poi/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                // Intento llamar a este endpoint con las credenciales del usuario.
                // Las credenciales las obtenemos en el Login.js a través de "token".
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => setEdit(data));
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setInterval(() => history.push('/login'), 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000));
    }, [history, id]);

    const submit = e => {

        e.preventDefault(); // evito que se recargue el formulario por defecto

        fetch(
            `${BASE_API_URL}/poi/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(edit),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                    // Intento llamar a este endpoint con las credenciales del usuario.
                    // Las credenciales las obtenemos en el Login.js a través de "token".
                }
            }
        ).then(response => {
            if (response.ok) {
                NotificationManager.success("Punto de interés modificado con éxito", "Éxito", 1000);
            } else {
                    if (response.status >= 400 && response.status < 500) {
                        NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 1000);
                    } else {
                        NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                    }
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    }

    return (
        <div className="form-wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al haber editado un punto de interés. */}

            <h1>Editar punto de interés</h1>
            <PoiForm onSubmit={submit} state={edit} updateState={setEdit} />
        </div>);
}
