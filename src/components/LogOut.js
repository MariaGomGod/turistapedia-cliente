import './Logout.sass';

export default function LogOut({ authenticatedUser, setAuthenticatedUser }) {

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthenticatedUser({});
        window.location.href = '/';
    };

    return (
        <div>
            <span className="button logout" onClick={logOut}>Cerrar sesión</span>
            <span id="greeting">¡Hola, {authenticatedUser.email}!</span>
        </div>
    );
}
