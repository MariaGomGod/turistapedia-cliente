import './Destination.sass';

export default function Destination() {
    return (
        <>
            <form id="destination">
                <div id="title"><h1>¿A&nbsp;dónde&nbsp;quieres&nbsp;ir?</h1></div>

                <input type="text" id="destinationInput" name="destinationInput" placeholder="Destino"></input>
            </form>
        </>
    )
}