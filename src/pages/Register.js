import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";
import './Register.sass';

export default function Register() {

    const [registerData, setRegisterData] = useState({});

    const history = useHistory();

    const register = e => {

        e.preventDefault();

        const form = e.target;

        fetch("http://localhost:8080/users", {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    setRegisterData({}); // vaciamos el estado
                    form.reset();           // vaciamos el formulario
                    NotificationManager.success("Registro exitoso. Redirigiendo a la página de inicio de sesión...", "Éxito", 3000);
                    setInterval(() => history.push('/login'), 3000); // setInterval nos permite redirigir al usuario a la página de login después de 3 segundos

                } else if (response.status >= 400 && response.status < 500) {
                    response.json().then(data => {
                        if (data.message.includes("unique")) {
                            const email = document.getElementById("email");
                            email.setCustomValidity("Este email ya está en uso, utiliza uno diferente");
                        }
                        NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 3000);
                    });
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

        if (field === "email") {
            e.target.setCustomValidity("");
            // Llegado a este punto, el usuario ha modificado el input al que corresponde el mail. Borramos el mensaje de error si 
            // lo hubiera, asumiendo que va a intentarlo con otro diferente.
        }

        setRegisterData(currentRegisterData => {
            const newRegisterData = { ...currentRegisterData };
            newRegisterData[field] = value;
            return newRegisterData;
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
        <div id="register" className="form-wrapper">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al añadir un nuevo registro. */}

            <h1>Regístrate en Turistapedia</h1>

            <form onSubmit={register}>

                <div className="form-section">
                    <div className="form-group">
                        <div className="control">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Introduce tu Email" onInput={handleInput} required></input>
                        </div>

                        <div className="control">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" placeholder="********" minLength="6" onInput={handlePassword} required></input>
                        </div>

                        <div className="control">
                            <label htmlFor="passwordCheck">Confirma tu contraseña</label>
                            <input type="password" id="passwordCheck" placeholder="********" minLength="6" onInput={handlePassword} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="securityQuestion">¿Cuál era el nombre de tu primer colegio?</label>
                            <input type="text" id="securityQuestion" placeholder="Introduce tu respuesta" onInput={handleInput} required></input>
                        </div>
                    </div>
                </div>

                <button className="button" type="submit">Enviar</button>

            </form>
        </div>
    )
}