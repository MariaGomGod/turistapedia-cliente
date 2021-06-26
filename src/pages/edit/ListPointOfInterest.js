import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useState, useEffect } from 'react';
import { BASE_API_URL } from "../../config/config";
import { useHistory } from 'react-router-dom';
import './ListPointOfInterest.sass';

export default function ListPointOfInterest() {

    const [list, setList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch(`${BASE_API_URL}/poi/all`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                // Intento llamar a este endpoint con las credenciales del usuario.
                // Las credenciales las obtenemos en el Login.js a través de "token".
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => setList(data));
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setInterval(() => history.push('/login'), 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
    }, [history]);

    const showDetails = e => {
        const id = e.target.id;
        history.push(`/admin/edit/${id}`);
    };

    return (
        <div id="list">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al editar un nuevo punto de interés. */}

            <h1 className="title">Puntos de interés existentes</h1>
            <table>
                <thead>
                    <tr>
                        <th className="name">Nombre</th>
                        <th className="categories">Categorías</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((element, index) => {
                        return (
                            <tr key={index} className="pending">
                                <td className="name">{element.name}</td>
                                <td className="categories">{element.categories.join(", ")}</td>
                                <td>
                                    <button className="button" id={element._id} value="Editar" onClick={showDetails}>Editar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
