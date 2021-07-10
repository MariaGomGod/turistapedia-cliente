import './Footer.sass';

export default function Footer() {
    return (
        <>
            <footer role="contentinfo" aria-relevant="removals">
                <nav id="navbar">
                    <ul>
                        <li className="nav-item">
                            <a className="nav-link" href="/about"><span className="sr-only">Haz click aquí para acceder a la página de</span>ACERCA&nbsp;DE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/terms-and-conditions"><span className="sr-only">Haz click aquí para acceder a la página de</span>CONDICIONES&nbsp;DE&nbsp;USO</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/privacy"><span className="sr-only">Haz click aquí para acceder a la página de</span>DECLARACIÓN&nbsp;DE&nbsp;PRIVACIDAD</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookies"><span className="sr-only">Haz click aquí para acceder a la página de</span>ACEPTACIÓN&nbsp;COOKIES</a>
                        </li>
                    </ul>
                    <p id="copyright" className="copyright"><span aria-hidden="true">&copy;&nbsp;</span>Copyright&nbsp;2021&nbsp;Turistapedia</p>
                </nav>
            </footer>
        </>
    )
}