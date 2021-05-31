import { useState, useEffect } from 'react';
import Map from '../components/Map';
import Filters from '../components/Filters';

export default function StreetMap() {

  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [center, setCenter] = useState({ lat: 37.3873069, lng: -6.0029337 });
  const [categories, setCategories] = useState(["restauración", "alojamiento", "plaza", "puente"]); 
  // Partimos de un array con todas las categorías. Añadir una categoría hace que potencialmente se muestren más puntos de interés.
  const [accessible, setAccessible] = useState([]);
  // Partimos de un array vacío, pues añadir un tipo de accesibilidad hace que potencialmente se muestren menos puntos de interés al ser más restrictivo.
  // Por tanto, el escenario en el que potencialmente más puntos de interés se mostrarán, es aquel en el que están seleccionadas todas las categorías y
  // no hay ningún filtro de accesibilidad seleccionado.

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/poi?latitude=${center.lat}&longitude=${center.lng}&categories=${categories}&accessible=${accessible}`)
      .then(response => response.json())
      .then(data => setPointsOfInterest(data));
  }, [center, categories, accessible]);

  return (
    <>
      <Filters categories={categories} setCategories={setCategories} setAccessible={setAccessible} />
      <Map pointsOfInterest={pointsOfInterest} center={center} setCenter={setCenter} />
    </>);
}
