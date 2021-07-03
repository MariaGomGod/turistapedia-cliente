import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useState, useEffect, useContext } from 'react';
import { BASE_API_URL } from "../../config/config";
import { useHistory } from 'react-router-dom';
import './ListPointOfInterest.sass';
import Swal from 'sweetalert2';
import { GlobalContext } from '../../App';

export default function ListPointOfInterest() {

    const [list, setList] = useState([]);

    const history = useHistory();

    const { logOut } = useContext(GlobalContext);

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
                        .then(data => setList(data.sort((element1, element2) => {
                            if (element1.active && !element2.active) {
                                return 1;
                            } else if (element2.active && !element1.active) {
                                return -1;
                            } else {
                                // Para poder operar con las fechas (restarlas), hay que convertirlas de String a Date
                                // El tipo Date no existe en JSON (el campo updatedAt viene del backend como un String)
                                return Date.parse(element2.updatedAt) - Date.parse(element1.updatedAt);
                            }
                        })));
                        // Utilizo el método sort() para que en el listado de puntos de interés, liste primero 
                        // aquellos pendientes de publicar.
                        // Si dos puntos de interés están publicados o despublicados, se ordenan por fecha,
                        // los más recientes primero
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000));
    }, [history, logOut]);

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
                    setList(currentList => {
                        const newList = currentList.map(element => {
                            if (element._id === id) {
                                const copy = {...element};
                                copy.active = publish;
                                copy.updatedAt = new Date().toISOString();
                                return copy;
                            } else {
                                return element;
                            }
                        });
                        newList.sort((element1, element2) => {
                            if (element1.active && !element2.active) {
                                return 1;
                            } else if (element2.active && !element1.active) {
                                return -1;
                            } else {
                                return Date.parse(element2.updatedAt) - Date.parse(element1.updatedAt);
                            }
                        });
                        return newList;
                    });
                    NotificationManager.success("Punto de interés modificado con éxito", "Éxito", 1000);
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    const showRemoveModal = e => {
        // Utilizo la librería SweetAlert para que al pulsar el botón de eliminar un punto de interés, advierta al usuario administrador,
        // con una alerta, si está realmente seguro de eliminar permanentemente (borrado físico) el punto de interés que ha seleccionado.
        const id = e.target.id;
        Swal.fire({
            title: "Eliminar",
            html: "<p aria-live='assertive'><span aria-hidden='true'>¿</span>Seguro que deseas eliminar este punto de interés?</p>",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: false,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            customClass: {
                confirmButton: 'button',
                cancelButton: 'button'
            },
            focusConfirm: false,
            focusCancel: true
        })
        .then(result => {
            if (result.isConfirmed) {
                remove(id);
            }
        })
    }

    const remove = id => {
        fetch(`${BASE_API_URL}/poi/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setList(currentList => currentList.filter(element => element._id !== id));
                    NotificationManager.success("Punto de interés eliminado con éxito", "Eliminado", 1000);
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    return (
        <div id="list">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al editar un nuevo punto de interés. */}

            <h2 className="title">Puntos de interés existentes</h2>
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
                                    <button className="button" id={element._id} value="Editar" onClick={showDetails}><span className="sr-only">Haz click aquí para&nbsp;</span>Editar<span className="sr-only">{element.name}</span></button>
                                </td>
                                <td className="action publish">
                                    {
                                        element.active ?
                                            <button className="button" id={element._id} value="Despublicar" onClick={e => publishOrUnpublish(e, false)}><span className="sr-only">Haz click aquí para&nbsp;</span>Despublicar<span className="sr-only">{element.name}</span></button> :
                                            <button className="button" id={element._id} value="Publicar" onClick={e => publishOrUnpublish(e, true)}><span className="sr-only">Haz click aquí para&nbsp;</span>Publicar<span className="sr-only">{element.name}</span></button>
                                    }
                                </td>
                                <td className="action">
                                    <button className="button" id={element._id} value="Eliminar" onClick={showRemoveModal}><span className="sr-only">Haz click aquí para&nbsp;</span>Eliminar<span className="sr-only">{element.name}</span></button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
