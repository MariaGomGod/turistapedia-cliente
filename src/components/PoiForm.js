import MainInformation from "../pages/create/MainInformation";
import Coordinates from "../pages/create/Coordinates";
import Categories from "../pages/create/Categories";
import Accesibility from "../pages/create/Accesibility";
import Webs from "../pages/create/Webs";
import Photos from "../pages/create/Photos";

export default function PoiForm({ onSubmit, state, updateState }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-section">
                <h5>Los campos marcados con * son obligatorios</h5>
                <MainInformation pointOfInterest={state} setPointOfInterest={updateState} />
                <Coordinates pointOfInterest={state} setPointOfInterest={updateState} />
                <Categories pointOfInterest={state} setPointOfInterest={updateState} />
                <Accesibility pointOfInterest={state} setPointOfInterest={updateState} />
                <Webs pointOfInterest={state} setPointOfInterest={updateState} />
                <Photos pointOfInterest={state} setPointOfInterest={updateState} />
            </div>
            <button type="submit" className="button">Enviar</button>
        </form>
    )
}
