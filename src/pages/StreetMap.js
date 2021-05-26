import { useState, useEffect } from 'react';
import Map from '../components/Map';
import Filters from '../components/Filters';

export default function StreetMap() {

  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [center, setCenter] = useState({ lat: 37.3873069, lng: -6.0029337 });
  const [categories, setCategories] = useState(["restauración", "alojamiento", "plaza", "puente"]);

  useEffect(() => {
    fetch(`http://localhost:8080/poi?latitude=${center.lat}&longitude=${center.lng}&categories=${categories}`)
      .then(response => response.json())
      .then(data => setPointsOfInterest(data));
  }, [center, categories]);

  return (
    <>
      <Filters categories={categories} setCategories={setCategories} />
      <Map pointsOfInterest={pointsOfInterest} center={center} setCenter={setCenter} />
    </>);
}
