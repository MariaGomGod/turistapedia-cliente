import './Map.sass'
import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '70%',
  height: '100%',
  float: 'right'
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCNJkyAndouVZpDlbY6ns_il2PZVjenfns"
  })

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 37.3873069, lng: -6.0029337 });
  const [pointsOfInterest, setPointsOfInterest] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/poi')
      .then(response => response.json())
      .then(data => setPointsOfInterest(data));
  }, [center]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={setMap}
      onUnmount={() => setMap(null)}
    >
      { pointsOfInterest.map(pointOfInterest => {
        return <Marker position={{lat: pointOfInterest.latitude, lng: pointOfInterest.longitude}} />;
      })}
      <></>
    </GoogleMap>
  ) : <></>
}