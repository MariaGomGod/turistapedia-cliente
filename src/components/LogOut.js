import './Logout.sass';
import { useContext } from 'react';
import { GlobalContext } from '../App';

export default function LogOut({ authenticatedUser }) {

    const { logOut } = useContext(GlobalContext);

    return (
        <>
            <span className="button logout" onClick={logOut}>Cerrar&nbsp;sesión</span>
            <span id="greeting">¡Hola, {authenticatedUser.email}!</span>
        </>
    );
}
