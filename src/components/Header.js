import './Header.sass';
import logo from '../images/logo.png';
import logoCb from '../images/logo_cb.png';
import LogOut from './LogOut';

export default function Header({ coldColors, setColdColors, volume, setVolume }) {

    return (
        <>
            <div id="header">
                <div id="first-row">
                    <img src={coldColors ? logoCb : logo} alt="turistapedia" />
                    <h1>La&nbsp;web&nbsp;del&nbsp;turista</h1>
                </div>
                <div id="second-row">
                    <LogOut />
                    <span className="button" onClick={() => setColdColors(currentColdColors => !currentColdColors)}>{coldColors ? "Colores calientes" : "Colores fríos"}</span>

                    {/* Aplico un toggle para que cambie la gama de color para discapacitados visuales. Si el toggle está activo, implanto la gama de colores fríos 
                    con estilos sass (Le aplico la clase colorblind al div con clase App en App.js), y uso un logo distinto en la cabecera (logoCb) */}

                    <span className="button" onClick={() => setVolume(currentVolume => currentVolume ? 0 : 1)}>{volume ? "Desactivar sonido" : "Activar sonido"}</span>
                    
                    {/* El botón volumen aparece el último en el HTML pero en el componente Header aparece a la izquierda del botón de cambio de color. Esto es así porque
                    ambos botones flotan a la derecha. El primer botón flotará justo en el borde derecho de la página, y el de volumen también flotará a la derecha pero
                    apilado a la izquierda del otro botón. */}
                </div>
            </div>
        </>
    )
}