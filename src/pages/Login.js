import { useState, useContext } from 'react';
import { GlobalContext } from '../App';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory, useLocation } from "react-router-dom";
import './Login.sass';

export default function Login() {

    const [loginForm, setLoginForm] = useState({});
    const { setAuthenticatedUser } = useContext(GlobalContext);
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search); // Accedemos a los query params de la página

    const login = e => {
        e.preventDefault();

        fetch("http://localhost:8080/users/login",
            {
                method: 'POST',
                body: JSON.stringify(loginForm),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        localStorage.setItem("token", data.token);
                        const authenticatedUser = data.user || {};
                        localStorage.setItem("user", JSON.stringify(authenticatedUser));
                        setAuthenticatedUser(authenticatedUser);
                        const redirectUrl = query.get("redirect") || '/';
                        history.push(redirectUrl);
                    });
            } else {
                if (response.status === 401) {
                    NotificationManager.warning("Email o contraseña erróneos", "Advertencia", 1000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            }
        }).catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000));
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */;
    };

    const handleInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        setLoginForm(currentLoginForm => {
            const newLoginForm = { ...currentLoginForm };
            newLoginForm[field] = value;
            return newLoginForm;
        });
    };

    const navigate = e => {
        e.preventDefault();
        history.push(e.target.pathname); // pathname muestra el nombre de la ruta de la URL actual
    }

    return (
        <div className="login-wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al iniciar sesión. */}
            <div id="login">
                <h1>¡Empieza&nbsp;a&nbsp;turistear&nbsp;ya!</h1>

                <form onSubmit={login}>

                    <div id="loginInputs">
                        <div className="inputBlock">
                            <label htmlFor="emailInput">Email&nbsp;*</label>
                            <input required type="email" name="email" placeholder="Introduce tu Email" onInput={handleInput}></input>
                        </div>

                        <div className="inputBlock">
                            <label htmlFor="passwordInput">Password&nbsp;*</label>
                            <input required type="password" name="password" placeholder="********" onInput={handleInput}></input>
                        </div>
                    </div>

                    <div className="inputBlock">
                        <input type="submit" value="Entrar" className="button"></input>
                    </div>

                    <ul id="account-links">

                        <li>
                            <a href="/reset-password" onClick={navigate} alt="contraseña olvidada">¿Olvidaste&nbsp;la&nbsp;contraseña?<span className="sr-only">Haz&nbsp;click&nbsp;aquí&nbsp;para&nbsp;restaurarla</span></a>
                        </li>
                        <li>
                            <a href="/register" onClick={navigate} alt="crear cuenta"><span className="sr-only">Haz&nbsp;click&nbsp;aquí&nbsp;para&nbsp;</span>Crear&nbsp;una&nbsp;cuenta</a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}