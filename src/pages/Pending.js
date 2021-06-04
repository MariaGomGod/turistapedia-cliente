import './Pending.sass';
import { useState, useEffect } from 'react';
import { BASE_API_URL } from "../config/config";

export default function Pending() {

    const [pending, setPending] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/poi/pending`)
            .then(response => response.json())
            .then(data => setPending(data));
    }, [BASE_API_URL]);

    const publish = e => {
        const id = e.target.id;
        fetch(`${BASE_API_URL}/poi/${id}/publish`, { method: 'PUT' })
            .then(data => setPending(currentPending => currentPending.filter(element => element._id !== id)));
    };

    return (
        <div id="pending">
            <h1 className="title">Puntos de interés pendientes de aprobar</h1>
            <table>
                <thead>
                    <tr>
                        <th className="name">Nombre</th>
                        <th className="categories">Categorías</th>
                        <th>Aprobar</th>
                    </tr>
                </thead>
                <tbody>
                    {pending.map((element, index) => {
                        return (
                            <tr key={index} className="pending">
                                <td className="name">{element.name}</td>
                                <td className="categories">{element.categories.join(", ")}</td>

                                <td className="publish-bottom">
                                    <button className="button" id={element._id} value="Aprobar" onClick={publish}>Aprobar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
