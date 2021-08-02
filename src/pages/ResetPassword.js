import { useState, useContext } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../App';
import { startSpeaking } from '../modules/Speech';
import { BASE_API_URL } from '../config/config';

export default function ResetPassword() {

    const [resetPassword, setResetPassword] = useState({});
    const { setAuthenticatedUser } = useContext(GlobalContext);

    const history = useHistory();

    const resetDataPassword = e => {

        e.preventDefault();

        const form = e.target;

        fetch(`${BASE_API_URL}/users/reset-password`, {
            method: 'PUT',
            body: JSON.stringify(resetPassword),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    setResetPassword({}); // vaciamos el estado
                    form.reset();         // vaciamos el formulario

                    // Estamos deslogando al usuario para forzarle a que introduzca de nuevo la nueva contraseña que ha proporcionado,
                    // para minimizar el riesgo de olvido o de que en realidad no sea la contraseña que el usuario quería.
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setAuthenticatedUser({});
                    startSpeaking("Nueva contraseña creada exitosamente. Redirigiendo a la página de inicio de sesión...");
                    NotificationManager.success("Nueva contraseña creada exitosamente. Redirigiendo a la página de inicio de sesión...", "Éxito", 3000);
                    setTimeout(() => history.push('/login'), 3000); // setTimeout nos permite redirigir al usuario a la página de login después de 3 segundos

                } else if (response.status === 404) {
                    startSpeaking("No existe un usuario con ese email, o la respuesta a la pregunta de seguridad no es correcta");
                    NotificationManager.warning("No existe un usuario con ese email, o la respuesta a la pregunta de seguridad no es correcta", "Advertencia", 1000);
                } else if (response.status >= 400 && response.status < 500) {
                    startSpeaking("Por favor, revise el formulario");
                    NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 1000);
                } else {
                    startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => {
                startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    const handleInput = e => {
        const field = e.target.id;
        const value = e.target.value;

        setResetPassword(currentResetPassword => {
            const newResetPassword = { ...currentResetPassword };
            newResetPassword[field] = value;
            return newResetPassword;
        });
    }

    const handlePassword = e => {
        const password = document.getElementById("password");
        const passwordCheck = document.getElementById("passwordCheck");

        if (password.value === passwordCheck.value) {
            password.setCustomValidity("");
        } else {
            password.setCustomValidity("Las contraseñas no coinciden");
        }

        if (e.target.id === "password") {
            handleInput(e);
        }
    }

    return (
        <div id="resetPassword" className="form-wrapper account-form">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al obtener una nueva contraseña. */}

            <h2>Obtén una nueva contraseña</h2>

            <form onSubmit={resetDataPassword}>

                <div className="form-section">
                    <h5 aria-hidden="true">Los&nbsp;campos&nbsp;marcados&nbsp;con&nbsp;*&nbsp;son&nbsp;obligatorios</h5>
                    <div className="form-group">
                        <div className="control">
                            <label htmlFor="email">Email&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="email" id="email" placeholder="Introduce tu Email" maxLength="100" onInput={handleInput} required></input>
                        </div>

                        <div className="control">
                            <label htmlFor="password">Nueva&nbsp;contraseña&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="password" id="password" placeholder="********" minLength="6" maxLength="50" onInput={handlePassword} required></input>
                        </div>

                        <div className="control">
                            <label htmlFor="passwordCheck">Confirma&nbsp;tu&nbsp;nueva&nbsp;contraseña&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="password" id="passwordCheck" placeholder="********" minLength="6" maxLength="50" onInput={handlePassword} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="securityQuestion"><span aria-hidden="true">¿</span>Cuál&nbsp;era&nbsp;el&nbsp;nombre&nbsp;de&nbsp;tu&nbsp;primer&nbsp;colegio?&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="text" id="securityQuestion" placeholder="Introduce tu respuesta" maxLength="50" onInput={handleInput} required></input>
                        </div>
                    </div>
                </div>
                <button className="button" type="submit"><span className="sr-only">Haz click aquí para </span>Enviar<span className="sr-only"> el formulario de reestablecimiento de contraseña</span></button>
            </form>
        </div>
    )
}