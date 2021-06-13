import './ResetPassword.sass';
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function ResetPassword() {

    const [resetPassword, setResetPassword] = useState({});

    const resetDataPassword = e => {

        e.preventDefault();

        const form = e.target;

        fetch("http://localhost:8080/users/reset-password", {
            method: 'PUT',
            body: JSON.stringify(resetPassword),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    setResetPassword({}); // vaciamos el estado
                    form.reset();           // vaciamos el formulario
                    NotificationManager.success("Nueva contraseña creada exitosamente. Redirigiendo a la página de inicio de sesión...", "Éxito", 3000);

                } else if (response.status === 404) {
                    NotificationManager.warning("No existe un usuario con ese email, o la respuesta a la pregunta de seguridad no es correcta", "Advertencia", 3000);
                } else if (response.status >= 400 && response.status < 500) {
                    NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 3000));
            /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    const handleInput = e => {
        const field = e.target.id;
        const value = e.target.value;

        setResetPassword(currentResetPassword => {
            const newResetPassword = {...currentResetPassword};
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
        <div className="wrapper">
            <div id="resetPassword">
                <NotificationContainer />
                {/* Este componente lo añado para que salga una notificación de éxito o error al obtener una nueva contraseña. */}

                <h1>Obtén una nueva contraseña</h1>

                <form onSubmit={resetDataPassword}>

                    <div id="resetPasswordInputs">
                        <div className="inputBlock">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" id="email" placeholder="Introduce tu Email" onInput={handleInput} required></input>
                        </div>

                        <div className="inputBlock">
                            <label htmlFor="passwordInput">Nueva contraseña</label>
                            <input type="password" id="password" placeholder="********" minLength="6" onInput={handlePassword} required></input>
                        </div>

                        <div className="inputBlock">
                            <label htmlFor="passwordInput">Confirma tu nueva contraseña</label>
                            <input type="password" id="passwordCheck" placeholder="********" minLength="6" onInput={handlePassword} required></input>
                        </div>
                        <div className="inputBlock">
                            <label htmlFor="securityQuestion">¿Cuál era el nombre de tu primer colegio?</label>
                            <input type="text" id="securityQuestion" placeholder="Introduce tu respuesta" onInput={handleInput} required></input>
                        </div>
                    </div>

                    <input type="submit" value="Enviar"></input>

                </form>
            </div>
        </div>

    )
}