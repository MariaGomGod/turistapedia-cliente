import './Information.sass'
import { faFacebook, faTripadvisor } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InfoWindow } from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';
import Speech from '../modules/Speech';

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
    Speech.startSpeaking(pointOfInterest.description);
  }, [volume, pointOfInterest]);

  return (<InfoWindow
    position={{ lat: pointOfInterest.location.coordinates[1], lng: pointOfInterest.location.coordinates[0] }}
    onCloseClick={() => {
      Speech.stopSpeaking();
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
          pointOfInterest.photos?.map((photo, i) => {
            return (<li key={i}>
              <img className="photos" src={photo.link} alt={photo.description} title={photo.description} />
            </li>);
          })
        }
      </ul>
    </div>
  </InfoWindow>);
}
