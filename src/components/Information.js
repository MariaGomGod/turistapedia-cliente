import { InfoWindow } from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';

const synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();
speech.rate = 0.8;
speech.lang = "es";

export default function Information({ pointOfInterest, setInformation }) {
  const {volume} = useContext(GlobalContext);

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
    zIndex={-9999}
    options= {{maxHeight : 400 }}
    >
    <div className="poi">
      <p>{pointOfInterest.description}</p>
      <ul>
        {
          pointOfInterest.links.map((link, i) => {
            return (<li key={i}>
              <a href={link.link} alt="links" target="_blank" rel="noopener noreferrer">{link.link}</a>
            </li>);
          })
        }
      </ul>
      <div className="card">
        {
          pointOfInterest.images.map((image, i) => {
            return (<li key={i}>
              <img src={image} alt="imagenes"/>
            </li>);
          })
        }
      </div>
    </div>
  </InfoWindow>);
}
