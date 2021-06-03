import './Pending.sass';

import { useState, useEffect } from 'react';

export default function Pending() {

    const [pending, setPending] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/poi/pending')
            .then(response => response.json())
            .then(data => setPending(data));
    }, []);

    const publish = e => {
        const id = e.target.id;
        fetch(`http://localhost:8080/poi/${id}/publish`, { method: 'PUT' })
            .then(data => setPending(currentPending => currentPending.filter(element => element._id !== id)));
    };

    return (
        <div id="pending">
            <h1 className="title">Puntos de interés pendientes de aprobar</h1>
            <table>
                <tr>
                    <th className="name">Nombre</th>
                    <th className="categories">Categorías</th>
                    <th>Aprobar</th>
                </tr>
                {pending.map(element => {
                    return (
                        <tr className="pending">
                            <td className="name">{element.name}</td>
                            <td className="categories">{element.categories.join(", ")}</td>

                            <td className="publish-bottom">
                                <button className="button" id={element._id} value="Aprobar" onClick={publish}>Aprobar</button>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    )
}
