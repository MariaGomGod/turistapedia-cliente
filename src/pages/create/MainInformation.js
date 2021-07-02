export default function MainInformation({ pointOfInterest, setPointOfInterest }) {

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
            <h3>Datos principales</h3>
            <div className="form-group">
                <div className="control">
                    <label htmlFor="name">Nombre&nbsp;*</label>
                    <input type="text" className="form-control" id="name" placeholder="Introduzca el nombre" defaultValue={pointOfInterest.name} required onInput={e => updateTextField(e, "name")}></input>
                </div>
                <div className="control">
                    <label htmlFor="description">Descripción&nbsp;*</label>
                    <textarea className="form-control" id="description" placeholder="Introduzca la descripción" defaultValue={pointOfInterest.description} required onInput={e => updateTextField(e, "description")}></textarea>
                </div>
            </div>
        </>
    )
}
