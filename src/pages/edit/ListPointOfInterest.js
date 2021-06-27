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

    const publishOrUnpublish = (e, publish) => {
        const id = e.target.id;
        const url = publish ? `${BASE_API_URL}/poi/${id}/publish` : `${BASE_API_URL}/poi/${id}/unpublish`;
        fetch(url, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                // Recorro el array del listado de puntos de interés y a aquel que coincida su id con el id del botón publicar o despublicar,
                // cambiamos el estado a activo o no, con el valor del parámetro publish. Cuando se quiere publicar, publish valdrá true lo 
                // que implicaría que el valor de active pasará a ser true en el backend. Al igualar en el frontend active a publish, estamos
                // reproduciendo ese mismo comportamiento en el frontend.
                if (response.ok) {
                    setList(currentList =>
                        currentList.map(element => {
                            if (element._id === id) {
                                const copy = {...element};
                                copy.active = publish;
                                return copy;
                            } else {
                                return element;
                            }
                        })
                    );
                    NotificationManager.success("Punto de interés modificado con éxito", "Éxito", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
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
                    setList(currentList => currentList.filter(element => element._id !== id));
                    NotificationManager.success("Punto de interés eliminado con éxito", "Eliminado", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
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
                        <th>Publicar&nbsp;/&nbsp;Despublicar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((element, index) => {
                        return (
                            <tr key={index} className="pending">
                                <td className="name">{element.name}</td>
                                <td className="categories">{element.categories.join(", ")}</td>
                                <td className="action">
                                    <button className="button" id={element._id} value="Editar" onClick={showDetails}>Editar</button>
                                </td>
                                <td className="action">
                                    {
                                        element.active ?
                                            <button className="button" id={element._id} value="Despublicar" onClick={e => publishOrUnpublish(e, false)}>Despublicar</button> :
                                            <button className="button" id={element._id} value="Publicar" onClick={e => publishOrUnpublish(e, true)}>Publicar</button>
                                    }
                                </td>
                                <td className="action">
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
