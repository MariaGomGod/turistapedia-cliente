import './HamburgerMenu.sass';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HamburgerMenu() {

    const toggleVisible = () => {
        document.getElementById("myLinks").classList.toggle('active');
    };

    return (
        <div className="topnav">
            <a href="#" className="icon" onClick={toggleVisible}>
                <FontAwesomeIcon icon={faBars} />
            </a>
            <div id="myLinks">
                <a href="/login"><span className="sr-only">Haz click aquí para </span>Iniciar&nbsp;sesión</a>
                <a href="/register"><span className="sr-only">Haz click aquí para </span>Crear&nbsp;cuenta</a>
                <a href="/reset-password"><span className="sr-only">Haz click aquí para </span>Restablecer&nbsp;contraseña</a>
                <a href="/create"><span className="sr-only">Haz click aquí para </span>Crear&nbsp;punto&nbsp;de&nbsp;interés</a>
                <a href="/admin/pending"><span className="sr-only">Haz click aquí para </span>Aprobar&nbsp;punto&nbsp;de&nbsp;interés</a>
                <a href="/admin/all"><span className="sr-only">Haz click aquí para </span>Ver&nbsp;todos&nbsp;los&nbsp;puntos&nbsp;de&nbsp;interés</a>
            </div>
        </div>
    )
}
