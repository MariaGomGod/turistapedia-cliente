import './Destination.sass';
import { useHistory } from "react-router-dom";

export default function Destination() {

    const history = useHistory();

    const selectDestination = e => {
        e.preventDefault();

        history.push('/map');
    };

    return (
        <div className="destination-wrapper">
            <div id="destination">
                <div id="title">
                    <h1>¿A&nbsp;dónde&nbsp;quieres&nbsp;ir?</h1>
                </div>
                <form onSubmit={selectDestination}>
                    <div id="loginInputs">
                        <div className="inputBlock">
                            <input required type="text" id="destinationInput" name="destinationInput" placeholder="Destino"></input>
                        </div>
                        <div className="inputBlock">
                            <button className="button" type="submit">¡Vamos!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}