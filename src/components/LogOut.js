import { useHistory } from 'react-router-dom';
import './Logout.sass';

export default function LogOut({ authenticatedUser, setAuthenticatedUser }) {

    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthenticatedUser({});
        history.push('/');
    };

    return (
        <>
            <span className="button logout" onClick={logOut}>Cerrar&nbsp;sesión</span>
            <span id="greeting">¡Hola, {authenticatedUser.email}!</span>
        </>
    );
}
