import './Map.sass';
import { memo, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PointOfInterest from './PointOfInterest';

/* Al cambiar un estado cualquiera, el mapa se re-renderizaba (aunque el mapa no supiera nada de él). Al pulsar en un punto de interés y abrirse la ventana de
información, Google Maps cambia por un momento el centro del mapa (que no es el mío), y al re-renderizarse el mismo, lo "pinta" en nuestro centro, causando un efecto 
visual poco estético. No quiero que el mapa se re-renderice si no ha cambiado nada que le pueda afectar. Esto lo conseguimos "memoizando" (React.memo) el componente
del mapa. Con ello, evitamos que React vuelva a re-renderizar el componente si no ha cambiado nada en sus props. */

export default memo(function Map({ pointsOfInterest, center, setCenter }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyD0ZkDZBRrd7hnaTqxAYWzbeRa3IDemKrc'
    });

    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(16);
    const [information, setInformation] = useState(null);

    const mapOptions = {
        styles: [
            {
                featureType: "poi",  // Oculto puntos de interés mostrados por defecto por Google Maps, para no saturar el mapa con los que se añadirán desde el backend.
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "transit",  // Oculto señales de transporte público mostrados por defecto por Google Maps.
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

    const addAltTexToMarkers = () => {
        document.querySelectorAll("div[aria-label='Map'] > div > div > div > div[role='button']")
            .forEach(element => {
                element.setAttribute('tabindex', 0);
                element.children[0].alt = element.title;
            });
    };

    const removeAltTextFromMarkers = () => {
        document.querySelectorAll("div[aria-label='Map'] > div > div > div > div[role='button']")
            .forEach(element => element.children[0].alt = '');
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName="map"
            center={center}
            zoom={zoom}
            onLoad={map => {
                setMap(map);
                setTimeout(addAltTexToMarkers, 500);
            }}
            onCenterChanged={() => {
                removeAltTextFromMarkers();
                setTimeout(addAltTexToMarkers, 500);
            }}
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
});
