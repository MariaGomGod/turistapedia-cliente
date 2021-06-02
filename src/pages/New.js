import './New.sass';
import { useState } from 'react';

export default function New() {

    const [pointOfInterest, setPointOfInterest] = useState({});

    function submit(e) {

        e.preventDefault(); // evito que se recargue el formulario por defecto

        const form = e.target;

        fetch(
            'http://localhost:8080/poi',
            {
                method: 'POST',
                body: JSON.stringify(pointOfInterest),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(() => setPointOfInterest({})) // vaciamos el estado
        .then(() => form.reset()); // vaciamos el formulario
    }

    function updateTextField(e, field) {

        // Creamos una función genérica para actualizar un campo de tipo string, dado su nombre y el input que contiene su nuevo valor.

        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = {...currentPointOfInterest};
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
            const newPointOfInterest = {...currentPointOfInterest};
            newPointOfInterest[field] = newPointOfInterest[field] || [];

            if (checked) {
                newPointOfInterest[field] = [...newPointOfInterest[field], input];
            } else {
                newPointOfInterest[field] = newPointOfInterest[field].filter(element => element !== input);
            }
            return newPointOfInterest;
        });
    }

    return (
        <div id="new-poi">
            <h1>Nuevo punto de interés</h1>
            <form onSubmit={submit}>
                <div className="form-section">
                    <h3>Datos principales</h3>
                    <div className="form-group">
                        <div class="control">
                            <label for="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Introduzca el nombre" required onChange={e => updateTextField(e, "name")}></input>
                        </div>
                        <div class="control">
                            <label for="description">Descripción</label>
                            <textarea className="form-control" id="description" placeholder="Introduzca la descripción" required onChange={e => updateTextField(e, "description")}></textarea>
                        </div>
                    </div>

                    <h3>Coordenadas</h3>
                    <div className="form-group">
                        <div class="control">
                            <label for="latitude">Latitud</label>
                            <input type="number" className="form-control" id="latitude" placeholder="Introduzca la latitud" step="0.000000000000001" required onChange={e => updateTextField(e, "latitude")}></input><br />
                        </div>
                        <div class="control">
                            <label for="logitude">Longitud</label>
                            <input type="number" className="form-control" id="longitude" placeholder="Introduzca la longitud" step="0.000000000000001" required onChange={e => updateTextField(e, "longitude")}></input>
                        </div>
                    </div>

                    <h3>Categorías</h3>
                    <div id="categories-checkbox" className="form-group checkbox">
                        <div class="control">
                            <label htmlFor="category-1">Restauración</label>
                            <input type="checkbox" id="category-1" value="restauración" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-2">Bar</label>
                            <input type="checkbox" id="category-2" value="bar" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-3">Restaurante</label>
                            <input type="checkbox" id="category-3" value="restaurante" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-4">Alojamiento</label>
                            <input type="checkbox" id="category-4" value="alojamiento" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-5">Hotel</label>
                            <input type="checkbox" id="category-5" value="hotel" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-6">Hostal</label>
                            <input type="checkbox" id="category-6" value="hostal" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-7">Apartamento</label>
                            <input type="checkbox" id="category-7" value="apartamento" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-8">Monumento</label>
                            <input type="checkbox" id="category-8" value="monumento" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-9">Puente</label>
                            <input type="checkbox" id="category-9" value="puente" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-10">Plaza</label>
                            <input type="checkbox" id="category-10" value="plaza" onChange={e => updateCheckboxField(e, "categories")}></input>
                        </div>
                    </div>
                </div>
                <div className="form-section">
                    <h3>Accesibilidad</h3>
                    <div id="accesible-checkbox" className="form-group checkbox">
                        <div class="control">

                            <label htmlFor="accesible-1">Sanitarios&nbsp;adaptados</label>
                            <input type="checkbox" id="accesible-1" value="adaptedToilet" onChange={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                        <div class="control">
                            <label htmlFor="accesible-2">Acceso&nbsp;adaptado</label>
                            <input type="checkbox" id="accesible-2" value="adaptedAccess" onChange={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                        <div class="control">
                            <label htmlFor="accesible-3">Habitaciones&nbsp;adaptadas</label>
                            <input type="checkbox" id="accesible-3" value="adaptedRoom" onChange={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                        <div class="control">
                            <label htmlFor="accesible-4">Audio&nbsp;guía</label>
                            <input type="checkbox" id="accesible-4" value="audioGuide" onChange={e => updateCheckboxField(e, "accessible")}></input><br />
                        </div>
                    </div>
                    <h3>Web oficial/Red social y enlaces</h3>
                    <div className="form-group">
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Web oficial" name="official"></input>
                        </div>
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Tripadvisor" name="tripadvisor"></input>
                        </div>
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Facebook" name="facebook"></input>
                        </div>
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Otros" name="misc"></input>
                        </div>
                    </div>
                    <h3>Fotografías</h3>
                    <div className="form-group">
                        <div class="control">
                            <label htmlFor="foto-1">&nbsp;Foto&nbsp;1</label>
                            <input type="text" className="form-control" placeholder="Foto-1" name="foto-1"></input>
                        </div>
                        <div class="control">
                            <label htmlFor="foto-2">&nbsp;Foto&nbsp;2</label>
                            <input type="text" className="form-control" placeholder="Foto-2" name="foto-2"></input>
                        </div>
                        <div class="control">
                            <label htmlFor="foto-3">&nbsp;Foto&nbsp;3</label>
                            <input type="text" className="form-control" placeholder="Foto-3" name="foto-3"></input>
                        </div>
                    </div>
                </div>
                <button type="submit" className="button">Enviar</button>
            </form>
        </div>);
}