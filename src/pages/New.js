import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './New.sass';
import { BASE_API_URL } from "../config/config";

export default function New() {

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
                    "Content-Type": "application/json"
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
        .catch(() =>  NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    }

    function updateTextField(e, field) {

        // Creamos una función genérica para actualizar un campo de tipo string, dado su nombre y el input que contiene su nuevo valor.

        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest[field] = input;
            return newPointOfInterest;
        });
    }

    function updateCheckboxField(e, field) {

        // Creamos una función genérica para actualizar un campo de tipo array de strings, dado su nombre y el input que contiene su nuevo valor.
        // Si el input está marcado, el nuevo valor se añade al campo, de lo contrario, se eliminará.

        const checked = e.target.checked;
        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest[field] = newPointOfInterest[field] || [];

            if (checked) {
                newPointOfInterest[field] = [...newPointOfInterest[field], input];
            } else {
                newPointOfInterest[field] = newPointOfInterest[field].filter(element => element !== input);
            }
            return newPointOfInterest;
        });
    }

    function updateCategories(e) {

        updateCheckboxField(e, "categories");

        const inputs = document.querySelectorAll('div#categories-checkbox input[type="checkbox"]');

        let atLeastOneChecked = false;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                atLeastOneChecked = true;
                break;
            }
        }

        inputs.forEach(element => element.required = !atLeastOneChecked);
    }

    function updateLink(e) {
        const link = e.target.value;
        const description = e.target.name;

        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest.links = (newPointOfInterest.links || []).filter(element => element.description !== description);

            if (link) {
                newPointOfInterest.links = [...newPointOfInterest.links, {link: link, description: description}];
            }
            return newPointOfInterest;
        });
    }

    return (
        <div id="new-poi">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al añadir un nuevo punto de interés. */}

            <h1>Nuevo punto de interés</h1>
            <form onSubmit={submit}>
                <div className="form-section">
                    <h3>Datos principales</h3>
                    <div className="form-group">
                        <div className="control">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Introduzca el nombre" required onInput={e => updateTextField(e, "name")}></input>
                        </div>
                        <div className="control">
                            <label htmlFor="description">Descripción</label>
                            <textarea className="form-control" id="description" placeholder="Introduzca la descripción" required onInput={e => updateTextField(e, "description")}></textarea>
                        </div>
                    </div>

                    <h3>Coordenadas</h3>
                    <div className="form-group">
                        <div className="control">
                            <label htmlFor="latitude">Latitud</label>
                            <input type="number" className="form-control" id="latitude" placeholder="Introduzca la latitud" step="0.000000000000000001" required onInput={e => updateTextField(e, "latitude")}></input><br />
                        </div>
                        <div className="control">
                            <label htmlFor="logitude">Longitud</label>
                            <input type="number" className="form-control" id="longitude" placeholder="Introduzca la longitud" step="0.000000000000000001" required onInput={e => updateTextField(e, "longitude")}></input>
                        </div>
                    </div>

                    <h3>Categorías</h3>
                    <div id="categories-checkbox" className="form-group checkbox">
                        <div className="control">
                            <label htmlFor="category-1">Restauración</label>
                            <input type="checkbox" id="category-1" value="restauración" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-2">Bar</label>
                            <input type="checkbox" id="category-2" value="bar" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-3">Restaurante</label>
                            <input type="checkbox" id="category-3" value="restaurante" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-4">Alojamiento</label>
                            <input type="checkbox" id="category-4" value="alojamiento" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-5">Hotel</label>
                            <input type="checkbox" id="category-5" value="hotel" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-6">Hostal</label>
                            <input type="checkbox" id="category-6" value="hostal" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-7">Apartamento</label>
                            <input type="checkbox" id="category-7" value="apartamento" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-8">Monumento</label>
                            <input type="checkbox" id="category-8" value="monumento" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-9">Puente</label>
                            <input type="checkbox" id="category-9" value="puente" onInput={updateCategories} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="category-10">Plaza</label>
                            <input type="checkbox" id="category-10" value="plaza" onInput={updateCategories} required></input>
                        </div>
                    </div>
                </div>
                <div className="form-section">
                    <h3>Accesibilidad</h3>
                    <div id="accesible-checkbox" className="form-group checkbox">
                        <div className="control">

                            <label htmlFor="accesible-1">Sanitarios&nbsp;adaptados</label>
                            <input type="checkbox" id="accesible-1" value="adaptedToilet" onInput={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                        <div className="control">
                            <label htmlFor="accesible-2">Acceso&nbsp;adaptado</label>
                            <input type="checkbox" id="accesible-2" value="adaptedAccess" onInput={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                        <div className="control">
                            <label htmlFor="accesible-3">Habitaciones&nbsp;adaptadas</label>
                            <input type="checkbox" id="accesible-3" value="adaptedRoom" onInput={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                        <div className="control">
                            <label htmlFor="accesible-4">Audio&nbsp;guía</label>
                            <input type="checkbox" id="accesible-4" value="audioGuide" onInput={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                    </div>
                    <h3>Web oficial/Red social y enlaces</h3>
                    <div className="form-group">
                        <div className="control">
                            <input type="text" className="form-control" placeholder="Web oficial" name="official" onInput={updateLink}></input>
                        </div>
                        <div className="control">
                            <input type="text" className="form-control" placeholder="Tripadvisor" name="tripadvisor" onInput={updateLink}></input>
                        </div>
                        <div className="control">
                            <input type="text" className="form-control" placeholder="Facebook" name="facebook" onInput={updateLink}></input>
                        </div>
                        <div className="control">
                            <input type="text" className="form-control" placeholder="Otros" name="misc" onInput={updateLink}></input>
                        </div>
                    </div>
                    <h3>Fotografías</h3>
                    <div className="form-group">
                        <div className="control">
                            <label htmlFor="foto-1">&nbsp;Foto&nbsp;1</label>
                            <input type="text" className="form-control" placeholder="Enlace" name="foto-1"></input>
                            <input type="text" className="form-control" placeholder="Descripción" name="desc-foto-1"></input>
                        </div>
                        <div className="control">
                            <label htmlFor="foto-2">&nbsp;Foto&nbsp;2</label>
                            <input type="text" className="form-control" placeholder="Enlace" name="foto-2"></input>
                            <input type="text" className="form-control" placeholder="Descripción" name="desc-foto-2"></input>
                        </div>
                        <div className="control">
                            <label htmlFor="foto-3">&nbsp;Foto&nbsp;3</label>
                            <input type="text" className="form-control" placeholder="Enlace" name="foto-3"></input>
                            <input type="text" className="form-control" placeholder="Descripción" name="desc-foto-3"></input>
                        </div>
                    </div>
                </div>
                <button type="submit" className="button">Enviar</button>
            </form>
        </div>);
}