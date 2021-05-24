import { faUtensils, faLandmark, faHotel, faArchway, faTree } from "@fortawesome/free-solid-svg-icons";
import { Marker } from '@react-google-maps/api';
import Information from './Information';

const getIcon = categories => {
  const baseIcon = {
    fillOpacity: 1,
    scale: 0.06,
    labelOrigin: {
      x: 300,
      y: 500
    },
    strokeColor: "#0",
    strokeOpacity: 0.8,
    strokeWeight: 1.5
  };
  if (categories.includes("restauración")) {
    return { ...baseIcon, path: faUtensils.icon[4], fillColor: "#4F4FFF" };
  }
  if (categories.includes("alojamiento")) {
    return { ...baseIcon, path: faHotel.icon[4], fillColor: "#000070" };
  }
  if (categories.includes("monumento")) {
    return { ...baseIcon, path: faLandmark.icon[4], fillColor: "#9C9CFF" };
  }
  if (categories.includes("puente")) {
    return { ...baseIcon, path: faArchway.icon[4], fillColor: "#303042" };
  }
  return { ...baseIcon, path: faTree.icon[4], fillColor: "#4646DB" };
}

export default function PointOfInterest({ pointOfInterest, setInformation, setCenter }) {
  return <Marker
    icon={getIcon(pointOfInterest.categories)}
    label={pointOfInterest.name}
    position={{ lat: pointOfInterest.latitude, lng: pointOfInterest.longitude }}
    onClick={() => {
      setCenter({ lat: pointOfInterest.latitude, lng: pointOfInterest.longitude }); // Movemos el mapa centŕandolo en las coordenadas que les hemos pasado
      setInformation(<Information pointOfInterest={pointOfInterest} setInformation={setInformation} />)
    }}
    zIndex={999} />;
}
