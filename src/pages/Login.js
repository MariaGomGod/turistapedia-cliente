import 'react-notifications/lib/notifications.css';
import './Login.sass';
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Login() {

    const [loginForm, setLoginForm] = useState({});

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
                        localStorage.setItem("user", JSON.stringify(data.user));
                    });
            } else {
                if (response.status === 401) {
                    NotificationManager.warning("Email o contraseña erróneos", "Advertencia", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
            }
        }).catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
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

    return (
        <div className="wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al iniciar sesión. */}
            <div className="image"><div className="fondo"></div></div>
            <div id="login"><h1>¡Empieza a turistear ya!</h1>

                <form onSubmit={login}>

                    <div id="loginInputs">
                        <div className="inputBlock">
                            <label for="emailInput">Email</label>
                            <input required type="email" name="email" placeholder="Introduce tu Email" onInput={handleInput}></input>
                        </div>

                        <div className="inputBlock">
                            <label for="passwordInput">Password</label>
                            <input required type="password" name="password" placeholder="********" onInput={handleInput}></input>
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
                </form>
            </div>
        </div>

    )
}