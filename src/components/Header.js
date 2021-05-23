import './Header.sass';
import logo from '../images/logo.png';
import logoCb from '../images/logo_cb.png';


export default function Header({ coldColors, setColdColors }) {
    return (
        <>
            <div id="header">
                <div id="first-row">
                    <img src={coldColors ? logoCb : logo} alt="turistapedia" />
                    <h1>La&nbsp;web&nbsp;del&nbsp;turista</h1>
                </div>
                <div id="second-row">
                    <span id="color-selector" onClick={() => setColdColors(currentColdColors => !currentColdColors)}>{coldColors ? "Colores calientes" : "Colores fríos"}</span>
                </div>
            </div>
        </>
    )
}