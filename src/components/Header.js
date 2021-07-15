import './Header.sass';
import logo from '../images/logo.png';
import logoCb from '../images/logo_cb.png';
import LogOut from './LogOut';
import { useContext, useEffect } from 'react';
import BurgerMenu from './BurgerMenu';
import { GlobalContext } from '../App';
import { useHistory } from 'react-router-dom';

export default function Header() {

    const { coldColors, setColdColors, volume, setVolume, authenticatedUser, setAuthenticatedUser } = useContext(GlobalContext);

    const history = useHistory();

    const navigate = e => {
        e.preventDefault();
        history.push(e.target.pathname);
    }

    useEffect(() => {
        // Al recargar la página o al navegar manualmente, el valor del estado desaparece, entonces utilizo useEffect para que al montarse 
        // el componente de header en todas las páginas, actualice el estado del usuario autenticado con lo que hubiera en el localstorage,
        // que no se pierde al navegar o recargar una página.
        const authenticatedUser = localStorage.getItem("user") || "{}";
        setAuthenticatedUser(JSON.parse(authenticatedUser));
    }, [setAuthenticatedUser]);

    useEffect(() => {
        // Actualizamos el estado del volumen con lo que haya en el localStorage
        const volume = localStorage.getItem("volume");
        setVolume(volume);
        // Actualizamos el estado de la gama de colores con lo que haya en el localStorage
        const coldColors = localStorage.getItem("coldColors") || "false";
        setColdColors(coldColors === "true");
    }, [setVolume, setColdColors]);

    return (
        <div id="header" role="banner">
            <div id="first-row">
                <a href="/" onClick={navigate}>
                    <img role="button" tabIndex="0" id="logo" src={coldColors ? logoCb : logo} onClick={() => history.push('/')} alt="Acceder a la página principal de Turistapedia" title="Acceder a la página principal de Turistapedia" />
                </a>
                <h1>La&nbsp;web&nbsp;del&nbsp;turista</h1>
            </div>
            {
                authenticatedUser.email ?
                    <div id="second-row">
                        <LogOut authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />
                    </div> :
                    <></>
            }
            <div id="third-row">
                <BurgerMenu />
                <span aria-hidden="true" className="button" onClick={() => {
                    setColdColors(currentColdColors => !currentColdColors);
                    // Hacemos lo mismo con el localStorage.
                    // Para ello nos traemos lo que hay ahora mismo almacenado, y machacamos
                    // la clave "coldColors" con el valor contrario
                    const storedColdColors = localStorage.getItem("coldColors");
                    localStorage.setItem("coldColors", storedColdColors === "false" ? "true" : "false");
                }}>Colores&nbsp;{coldColors.toString() === "false" ? "fríos" : "calientes"}</span>

                {/* Aplico un toggle para que cambie la gama de color para discapacitados visuales. Si el toggle está activo, implanto la gama de colores fríos 
                    con estilos sass (Le aplico la clase colorblind al div con clase App en App.js), y uso un logo distinto en la cabecera (logoCb) */}

                <span tabIndex="0" id="speech-toggle" className="button" onClick={() => {
                    setVolume(currentVolume => currentVolume === "0" ? "1" : "0");
                    // Hacemos lo mismo con el localStorage dado que Speech no puede acceder a estados de React
                    // al no ser un componente. Tenemos que insertar lo contrario de lo que hubiera hasta este 
                    // momento. Para ello nos traemos lo que hay ahora mismo almacenado, y machacamos
                    // la clave "volume" con el valor contrario
                    const storedVolume = localStorage.getItem("volume");
                    localStorage.setItem("volume", storedVolume === "0" ? "1" : "0");
                }}><span className="sr-only">Haz click aquí para&nbsp;</span>{volume === "1" ? "Desa" : "A"}ctivar&nbsp;locuciones<span className="sr-only">&nbsp;en esta aplicación</span></span>

                {/* El botón volumen aparece el último en el HTML pero en el componente Header aparece a la izquierda del botón de cambio de color. Esto es así porque
                    ambos botones flotan a la derecha. El primer botón flotará justo en el borde derecho de la página, y el de volumen también flotará a la derecha pero
                    apilado a la izquierda del otro botón. */}
            </div>
        </div>
    )
}