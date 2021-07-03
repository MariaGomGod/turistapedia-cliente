import './Logout.sass';
import { useContext } from 'react';
import { GlobalContext } from '../App';

export default function LogOut({ authenticatedUser }) {

    const { logOut } = useContext(GlobalContext);

    return (
        <>
            <span tabIndex="0" className="button logout" onClick={logOut}><span className="sr-only">Haz click aquí para</span>Cerrar&nbsp;sesión</span>
            <span id="greeting">Hola, {authenticatedUser.email}</span>
        </>
    );
}
