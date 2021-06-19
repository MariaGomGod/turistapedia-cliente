import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Pending.sass';
import { useState, useEffect } from 'react';
import { BASE_API_URL } from "../config/config";

export default function Pending() {

    const [pending, setPending] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/poi/pending`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                // Intento llamar a este endpoint con las credenciales del usuario.
                // Las credenciales las obtenemos en el Login.js a través de "token".
            }
        })
            .then(response => response.json())
            .then(data => setPending(data));
    }, []);

    const publish = e => {
        const id = e.target.id;
        fetch(`${BASE_API_URL}/poi/${id}/publish`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setPending(currentPending => currentPending.filter(element => element._id !== id));
                    NotificationManager.success("Punto de interés aprobado con éxito", "Éxito", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() =>  NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
            /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    const remove = e => {
        const id = e.target.id;
        fetch(`${BASE_API_URL}/poi/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setPending(currentPending => currentPending.filter(element => element._id !== id));
                    NotificationManager.success("Punto de interés eliminado con éxito", "Eliminado", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() =>  NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
            /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    return (
        <div id="pending">
             <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al añadir un nuevo punto de interés. */}

            <h1 className="title">Puntos de interés pendientes de aprobar</h1>
            <table>
                <thead>
                    <tr>
                        <th className="name">Nombre</th>
                        <th className="categories">Categorías</th>
                        <th>Aprobar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {pending.map((element, index) => {
                        return (
                            <tr key={index} className="pending">
                                <td className="name">{element.name}</td>
                                <td className="categories">{element.categories.join(", ")}</td>
                                <td>
                                    <button className="button" id={element._id} value="Aprobar" onClick={publish}>Aprobar</button>
                                </td>
                                <td>
                                    <button className="button" id={element._id} value="Eliminar" onClick={remove}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
