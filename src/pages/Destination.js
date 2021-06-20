import './Destination.sass';
import { useHistory } from "react-router-dom";

export default function Destination() {

    const history = useHistory();

    const selectDestination = e => {
        e.preventDefault();

        history.push('/map');
    };

    return (
        <>
            <form onSubmit={selectDestination}>
                <div id="title"><h1>¿A&nbsp;dónde&nbsp;quieres&nbsp;ir?</h1></div>

                <input required type="text" id="destinationInput" name="destinationInput" placeholder="Destino"></input>

                <button className="button" type="submit">¡Vamos!</button>
            </form>
        </>
    );
}