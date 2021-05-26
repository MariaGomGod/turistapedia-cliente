import './Information.sass'
import { faFacebook, faTripadvisor } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InfoWindow } from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';

const synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();
speech.rate = 0.8;
speech.lang = "es";

const getIcon = description => {
  if (description === "official") {
    return faAt;
  } else if (description === "tripadvisor") {
    return faTripadvisor;
  }
  return faFacebook;
}

export default function Information({ pointOfInterest, setInformation }) {

  const { volume } = useContext(GlobalContext);

  synth.cancel();
  speech.text = pointOfInterest.description;

  useEffect(() => {
    speech.volume = volume;
    if (!synth.speaking && speech.volume) {
      synth.speak(speech);
    }
  }, [volume]);

  return (<InfoWindow
    position={{ lat: pointOfInterest.latitude, lng: pointOfInterest.longitude }}
    onCloseClick={() => {
      synth.cancel();
      setInformation(null);
    }}
    zIndex={-9999}>
    <div className="poi">
      <p>{pointOfInterest.description}</p>
      <ul>
        {
          pointOfInterest.links.map((link, i) => {
            return (<li key={i}>
              <span>
                <FontAwesomeIcon icon={getIcon(link.description)} />
              </span>
              <span>
                <span className="sr-only">Enlaza con</span>
                <a className="poi-links" href={link.link} alt={'Página ' + (link.description === 'official' ? 'oficial' : 'de ' + link.description)} target="_blank" rel="noopener noreferrer">{link.link}</a>
              </span>
            </li>);
          })
        }
      </ul>
      <div className="card">
        {
          pointOfInterest.images.map((image, i) => {
            return (<li key={i}>
              <img className="photos" src={image} alt="imagenes" />
            </li>);
          })
        }
      </div>
    </div>
  </InfoWindow>);
}