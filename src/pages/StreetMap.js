import './StreetMap.sass'
import { useState, useEffect } from 'react';
import Map from '../components/Map';

export default function StreetMap() {

  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [center, setCenter] = useState({ lat: 37.3873069, lng: -6.0029337 });

  useEffect(() => {
    fetch('http://localhost:8080/poi')
      .then(response => response.json())
      .then(data => setPointsOfInterest(data));
  }, [center]);

  return (<Map pointsOfInterest={pointsOfInterest} center={center} setCenter={setCenter} />);
}
