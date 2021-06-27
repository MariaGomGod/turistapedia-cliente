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

    return (
        <>
            <div id="header">
                <div id="first-row">
                    <a href="/" onClick={navigate}>
                        <img id="logo" src={coldColors ? logoCb : logo} alt="turistapedia" />
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
                    <span className="button" onClick={() => setColdColors(currentColdColors => !currentColdColors)}>Colores&nbsp;{coldColors ? "calientes" : "fríos"}</span>

                    {/* Aplico un toggle para que cambie la gama de color para discapacitados visuales. Si el toggle está activo, implanto la gama de colores fríos 
                    con estilos sass (Le aplico la clase colorblind al div con clase App en App.js), y uso un logo distinto en la cabecera (logoCb) */}

                    <span className="button" onClick={() => setVolume(currentVolume => currentVolume ? 0 : 1)}>{volume ? "Des" : "A"}ctivar&nbsp;sonido</span>

                    {/* El botón volumen aparece el último en el HTML pero en el componente Header aparece a la izquierda del botón de cambio de color. Esto es así porque
                    ambos botones flotan a la derecha. El primer botón flotará justo en el borde derecho de la página, y el de volumen también flotará a la derecha pero
                    apilado a la izquierda del otro botón. */}
                </div>
            </div>
        </>
    )
}