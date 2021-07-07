import './Destination.sass';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { NotificationManager } from 'react-notifications';

export default function Destination() {

    const history = useHistory();

    const [destination, setDestination] = useState('');

    const selectDestination = e => {
        e.preventDefault();
        const form = e.target;

        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyD0ZkDZBRrd7hnaTqxAYWzbeRa3IDemKrc';

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${destination}`)
            // Utilizo el API de geocoding de Google para que resuelva las coordenadas de un punto dado proporcionado por el usuario.
            .then(response => response.json())
            .then(data => {
                const firstResult = (data.results || [])[0];
                form.reset();
                if (firstResult) {
                    const center = firstResult.geometry.location;
                    localStorage.setItem("center", JSON.stringify(center));
                    history.push('/map');
                } else {
                    NotificationManager.warning("No se han encontrado resultados, por favor inténtelo de nuevo con otra dirección.", "Advertencia", 3000);
                }
            });
    };

    const handleInput = e => {
        const input = e.target.value;
        setDestination(input);
    };

    return (
        <div className="destination-wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al indicar el destino. */}
            <div id="destination">
                <div id="title">
                    <h2><span aria-hidden="true">¿</span>A&nbsp;dónde&nbsp;quieres&nbsp;ir?</h2>
                </div>
                <form onSubmit={selectDestination}>
                    <div id="loginInputs">
                        <div className="inputBlock">
                            <label htmlFor="destinationInput">Destino</label>
                            <input required type="text" id="destinationInput" name="destinationInput" onInput={handleInput}></input>
                        </div>
                        <div className="inputBlock">
                            <button className="button" type="submit"><span aria-hidden="true">¡</span>Vamos!<span className="sr-only">&nbsp;Haz click aquí para iniciar tu viaje</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}