import { InfoWindow } from '@react-google-maps/api';

const synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();
speech.rate = 0.8;
speech.lang = "es";

export default function Information({ pointOfInterest, setInformation }) {
  synth.cancel();
  speech.text = pointOfInterest.description;
  synth.speak(speech);

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
              <a href={link.link}>{link.link}</a>
            </li>);
          })
        }
      </ul>
    </div>
  </InfoWindow>);
}
