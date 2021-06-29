import { useState, useEffect } from 'react';
import Map from '../components/Map';
import Filters from '../components/Filters';
import { BASE_API_URL } from "../config/config";

export default function StreetMap() {

  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [center, setCenter] = useState({});
  const [categories, setCategories] = useState(["restauración", "alojamiento", "monumento", "plaza", "puente"]);
  // Partimos de un array con todas las categorías. Añadir una categoría hace que potencialmente se muestren más puntos de interés.
  const [accessible, setAccessible] = useState([]);
  // Partimos de un array vacío, pues añadir un tipo de accesibilidad hace que potencialmente se muestren menos puntos de interés al ser más restrictivo.
  // Por tanto, el escenario en el que potencialmente más puntos de interés se mostrarán, es aquel en el que están seleccionadas todas las categorías y
  // no hay ningún filtro de accesibilidad seleccionado.

  useEffect(() => {
    window.speechSynthesis.cancel();
    setCenter(JSON.parse(localStorage.getItem("center")));
  }, []);

  useEffect(() => {
    if (center.lat && center.lng) { 
      /* Como no podemos saber a ciencia cierta que useEffect se ejecutará antes, para asegurarnos de que el primer useEffect ha 
      terminado de ejecutarse completamente, al segundo useEffect le pasamos una condición en la que si la latitud y longitud no
      está vacía, significa que el primer useEffect ya ha terminado de ejecutarse, al actualizarse el centro con lo que nos venga
      del localStorage. */
      fetch(`${BASE_API_URL}/poi?latitude=${center.lat}&longitude=${center.lng}&categories=${categories}&accessible=${accessible}`)
        .then(response => response.json())
        .then(data => setPointsOfInterest(data));
    }
  }, [center, categories, accessible]);

  return (
    <>
      <Filters categories={categories} setCategories={setCategories} setAccessible={setAccessible} />
      <Map pointsOfInterest={pointsOfInterest} center={center} setCenter={setCenter} />
    </>);
}
