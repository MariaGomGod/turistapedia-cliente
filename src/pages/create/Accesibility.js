export default function Accesibility({ setPointOfInterest }) {

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

    return (
        <>
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
        </>
    )
}
