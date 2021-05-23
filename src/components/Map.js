import { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PointOfInterest from './PointOfInterest';

const containerStyle = {
    width: '70%',
    height: '100%',
    float: 'right'
};

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
                featureType: "poi",  // Ocultar puntos de interés mostrados por defecto por Google Maps, para no saturar el mapa con los que se añadirán desde el backend
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "transit",  // Ocultar señales de transporte público mostrados por defecto por Google Maps
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            }
        ],
        center: center,
        disableDoubleClickZoom: true, //  Con esto se evita que se incremente el zoom al hacer doble click sobre cualquier punto del mapa
        disableDefaultUI: true, // Con esto se ocultan los controles de aumentar y reducir zoom, entrar en modo Street View, ver a pantalla completa, etcétera
        zoom: zoom
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={setMap}
            options={mapOptions}
            onDragEnd={() => setCenter(map.getCenter())}
            onZoomChanged={() => map && setZoom(map.getZoom())}
            onUnmount={() => setMap(null)}>
            {
                pointsOfInterest.map((pointOfInterest, i) =>
                    <PointOfInterest key={i} pointOfInterest={pointOfInterest} setInformation={setInformation} />)
            }
            {information}
        </GoogleMap>
    ) : <></>
}
