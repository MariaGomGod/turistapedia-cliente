export default function Accesibility({ pointOfInterest, setPointOfInterest }) {

    function updateAccessible(e) {
        const checked = e.target.checked;
        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = {...currentPointOfInterest};
            newPointOfInterest.accessible = {...newPointOfInterest.accessible};
            newPointOfInterest.accessible[input] = checked;
            return newPointOfInterest;
        });
    }

    return (
        <>
            <h3>Accesibilidad</h3>
            <div id="accesible-checkbox" className="form-group checkbox">
                <div className="control">
                    <label htmlFor="accesible-1">Sanitarios&nbsp;adaptados</label>
                    <input type="checkbox" id="accesible-1" value="adaptedToilet" defaultChecked={pointOfInterest.accessible?.adaptedToilet} onInput={updateAccessible}></input><br />
                </div>
                <div className="control">
                    <label htmlFor="accesible-2">Acceso&nbsp;adaptado</label>
                    <input type="checkbox" id="accesible-2" value="adaptedAccess" defaultChecked={pointOfInterest.accessible?.adaptedAccess} onInput={updateAccessible}></input><br />
                </div>
                <div className="control">
                    <label htmlFor="accesible-3">Habitaciones&nbsp;adaptadas</label>
                    <input type="checkbox" id="accesible-3" value="adaptedRoom" defaultChecked={pointOfInterest.accessible?.adaptedRoom} onInput={updateAccessible}></input><br />
                </div>
                <div className="control">
                    <label htmlFor="accesible-4">Audio&nbsp;guía</label>
                    <input type="checkbox" id="accesible-4" value="audioGuide" defaultChecked={pointOfInterest.accessible?.audioGuide} onInput={updateAccessible}></input><br />
                </div>
            </div>
        </>
    )
}
