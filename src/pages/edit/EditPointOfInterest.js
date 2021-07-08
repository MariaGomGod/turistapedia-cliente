import { useState, useEffect, useContext } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../../config/config";
import PoiForm from '../../components/PoiForm';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../../App';
import { startSpeaking } from '../../modules/Speech';

export default function EditPointOfInterest() {

    const [edit, setEdit] = useState({});

    const { id } = useParams();

    const history = useHistory();

    const { logOut } = useContext(GlobalContext);

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
                    startSpeaking("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...");
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else if (response.status === 403) {
                    history.push('/error');
                } else {
                    startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    }, [history, id, logOut]);

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
                startSpeaking("Punto de interés modificado con éxito");
                NotificationManager.success("Punto de interés modificado con éxito", "Éxito", 1000);
            } else {
                    if (response.status === 401) {
                        startSpeaking("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...");
                        NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                        setTimeout(logOut, 3000);
                    } else if (response.status >= 400 && response.status < 500) {
                        startSpeaking("Por favor, revise el formulario");
                        NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 1000);
                    } else {
                        startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                        NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                    }
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => {
                startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    }

    return (
        <div className="form-wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al haber editado un punto de interés. */}

            <h2>Editar punto de interés</h2>
            <PoiForm onSubmit={submit} state={edit} updateState={setEdit} />
        </div>);
}
