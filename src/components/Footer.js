import './Footer.sass';

export default function Footer() {
    return (
        <>
            <footer>
                <nav id="navbar">
                    <ul>
                        <li className="nav-item">
                            <a className="nav-link" href="#">ACERCA&nbsp;DE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">CONDICIONES&nbsp;DE&nbsp;USO</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">DECLARACIÓN&nbsp;DE&nbsp;PRIVACIDAD</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">ACEPTACIÓN&nbsp;COOKIES</a>
                        </li>
                    </ul>
                    <p id="copyright" className="copyright">&copy;&nbsp;Copyright&nbsp;2021&nbsp;Turistapedia</p>
                </nav>
            </footer>
        </>
    )
}