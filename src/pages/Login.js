import './Login.sass';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
    return (
        <div className="wrapper">
                <div className="image"><div className="fondo"></div></div>
                <div id="login"><h1>¡Empieza a turistear ya!</h1>

                <form action="#" method="GET">

                <div id="loginInputs">
                    <div className="inputBlock">
                        <label for="emailInput">Email</label>
                        <input required type="email" id="emailInput" name="userEmail" placeholder="Introduce tu Email"></input>
                    </div>

                    <div className="inputBlock">
                        <label for="passwordInput">Password</label>
                        <input type="password" id="passwordInput" name="passwordInput" placeholder="********"></input>
                    </div>

                    <div className="inputBlock">
                        <input type="submit" value="Entrar" class="button"></input>
                    </div>
                </div>

                <ul id="account-links">

                    <li><a href="#" alt="contraseña olvidada">
                        <strong>¿Olvidaste la contraseña?</strong>
                        <span className="sr-only">Haz&nbsp;click&nbsp;aquí&nbsp;para&nbsp;restaurarla</span>
                        </a>
                    </li>
                    <li><a href="#" alt="crear cuenta"><span className="sr-only">Haz&nbsp;click&nbsp;aquí&nbsp;para&nbsp;</span><strong>Crear una cuenta</strong></a></li>
                </ul>

                <div className="inputBlock"><p>Iniciar&nbsp;sesión</p></div>

                <a href="#" className="social" alt="iniciar sesión con facebook">
                <FontAwesomeIcon icon={faFacebook} />
                        <span className="sr-only">Iniciar&nbsp;sesión&nbsp;con</span>&nbsp;Facebook {/* Introduzco un span con una clase sass (sr-only) a la altura de index.js que no se va a ver en pantalla pero que sirve para accesibilidad (que se lo lea al usuario con discapacidad visual) */}
                </a>
                
                </form>
                </div>
        </div>
        
    )
}