export default function Coordinates({ pointOfInterest, setPointOfInterest }) {

    function updateTextField(e, field) {

        // Creamos una función genérica para actualizar un campo de tipo string, dado su nombre y el input que contiene su nuevo valor.

        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            const currentCoordinates = currentPointOfInterest.location?.coordinates || [];
            const newCoordinates = [...currentCoordinates];
            if (field === 'longitude') {
                newCoordinates[0] = input;
            } else if (field === 'latitude') {
                newCoordinates[1] = input;
            }
            newPointOfInterest.location = { type: "Point", coordinates: newCoordinates};
            return newPointOfInterest;
        });
    }

    return (
        <>
            <h3>Coordenadas</h3>
            <div className="form-group">
                <div className="control">
                    <label htmlFor="latitude">Latitud&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                    <input type="number" className="form-control" id="latitude" placeholder="Introduzca la latitud" min="-90" max="90" defaultValue={pointOfInterest.location?.coordinates[1]} step="0.000000000000000001" required onInput={e => updateTextField(e, "latitude")}></input><br />
                </div>
                <div className="control">
                    <label htmlFor="longitude">Longitud&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                    <input type="number" className="form-control" id="longitude" placeholder="Introduzca la longitud" min="-180" max="80" defaultValue={pointOfInterest.location?.coordinates[0]} step="0.000000000000000001" required onInput={e => updateTextField(e, "longitude")}></input>
                </div>
            </div>
        </>
    )
}
