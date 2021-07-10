import './BurgerMenu.sass';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

export default function BurgerMenu() {

    const toggleActive = () => {
        document.getElementById("myLinks").classList.toggle('active');
    };

    const show = () => {
        document.getElementById("myLinks").classList.add('active');
    };

    const hide = () => {
        document.getElementById("myLinks").classList.remove('active');
    };

    const navigate = e => {
        e.preventDefault();
        hide(); // llamo a dicha función para que desaparezca el menú de opciones (cuando se selecciona un enlace)
        history.push(e.target.pathname); // pathname muestra el nombre de la ruta de la URL actual
    }

    const history = useHistory();

    return (
        <div className="topnav" onMouseLeave={hide}>
            <button className="icon" onClick={toggleActive} onMouseEnter={show}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div id="myLinks">
                {
                    localStorage.getItem("user") ?
                        <></> :
                        <>
                            <a href="/login" onClick={navigate}><span className="sr-only">Haz click aquí para </span>Iniciar&nbsp;sesión</a>
                            <a href="/register" onClick={navigate}><span className="sr-only">Haz click aquí para </span>Crear&nbsp;una&nbsp;cuenta</a>
                        </>
                }
                <a href="/reset-password" onClick={navigate}><span className="sr-only">Haz click aquí para </span>Restablecer&nbsp;contraseña</a>
                <a href="/destination" onClick={navigate}><span className="sr-only">Haz click aquí para </span>Elegir&nbsp;destino</a>
                <a href="/create" onClick={navigate}><span className="sr-only">Haz click aquí para </span>Crear&nbsp;punto&nbsp;de&nbsp;interés</a>
                <a href="/points-of-interest" onClick={navigate}><span className="sr-only">Haz click aquí para </span>Ver&nbsp;todos&nbsp;los&nbsp;puntos&nbsp;de&nbsp;interés</a>
            </div>
        </div>
    )
}
