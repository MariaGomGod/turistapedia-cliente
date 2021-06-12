import './SecurityQuestion.sass';

export default function SecurityQuestion() {
    return (
        <div className="wrapper">
            <div id="securityQuestion">
                <h1>¿Tienes problemas para iniciar sesión?</h1>
                <h2>Responde a esta pregunta de seguridad</h2>

                <form action="#">

                    <div className="inputBlock">
                        <label for="securityQuestion">¿Cuál era el nombre de tu primer colegio?</label>
                        <input type="text" id="securityQuestionInput" name="securityQuestionInput" placeholder="Introduce tu respuesta"></input>
                    </div>

                    <input type="submit" value="Enviar"></input>
                    
                </form>
            </div>
        </div>

    )
}