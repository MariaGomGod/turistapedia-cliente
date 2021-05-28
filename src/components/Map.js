import './Map.sass';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PointOfInterest from './PointOfInterest';

export default function Map({ pointsOfInterest, center, setCenter }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCNJkyAndouVZpDlbY6ns_il2PZVjenfns"
    });

    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(16);
    const [information, setInformation] = useState(null);

    const mapOptions = {
        styles: [
            {
                featureType: "poi",  // Oculto puntos de interés mostrados por defecto por Google Maps, para no saturar el mapa con los que se añadirán desde el backend
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "transit",  // Oculto señales de transporte público mostrados por defecto por Google Maps
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            }
        ],
        center: center,
        disableDoubleClickZoom: true, // Evitamos que se incremente el zoom al hacer doble click sobre cualquier punto del mapa
        disableDefaultUI: true, // Ocultamos los controles de aumentar y reducir zoom, entrar en modo Street View, ver a pantalla completa, etcétera
        zoom: zoom,
        gestureHandling: "cooperative"
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName="map"
            center={center}
            zoom={zoom}
            onLoad={setMap}
            options={mapOptions}
            onDragEnd={() => setCenter({ lat: map.getCenter().lat(), lng: map.getCenter().lng() })}
            onZoomChanged={() => map && setZoom(map.getZoom())}
            onUnmount={() => setMap(null)}>
            {
                pointsOfInterest.map((pointOfInterest, i) =>
                    <PointOfInterest key={i} pointOfInterest={pointOfInterest} setInformation={setInformation} setCenter={setCenter} />)
            }
            {information}
        </GoogleMap>
    ) : <></>
}
