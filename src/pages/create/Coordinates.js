export default function Coordinates({ setPointOfInterest }) {

    function updateTextField(e, field) {

        // Creamos una función genérica para actualizar un campo de tipo string, dado su nombre y el input que contiene su nuevo valor.

        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest[field] = input;
            return newPointOfInterest;
        });
    }

    return (
        <>
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
        </>
    )
}
