export default function LogOut() {

    let user = localStorage.getItem("user");

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        user = null;
    };

    return (user ?
        <div>
            <span>Hola, {JSON.parse(user).email}</span>
            <button value="Cerrar sesión" onClick={logOut}>Cerrar sesión</button>
        </div>
        : <></>);
}
