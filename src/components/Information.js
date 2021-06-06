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
  if (description === "facebook") {
    return faFacebook;
  } else if (description === "tripadvisor") {
    return faTripadvisor;
  }
  return faAt;
}

export default function Information({ pointOfInterest, setInformation }) {

  const { volume } = useContext(GlobalContext);

  useEffect(() => {
    synth.cancel();
    speech.text = pointOfInterest.description;
    speech.volume = volume;
    if (!synth.speaking && speech.volume) {
      synth.speak(speech);
    }
  }, [volume, pointOfInterest]);

  return (<InfoWindow
    position={{ lat: pointOfInterest.latitude, lng: pointOfInterest.longitude }}
    onCloseClick={() => {
      synth.cancel();
      setInformation(null);
    }}>
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
      <ul>
        {
          pointOfInterest.images?.map((image, i) => {
            return (<li key={i}>
              <img className="photos" src={image} alt="imagenes" />
            </li>);
          })
        }
      </ul>
    </div>
  </InfoWindow>);
}
