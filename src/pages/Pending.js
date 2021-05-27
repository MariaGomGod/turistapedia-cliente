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
        <div>
            <h2 className="">Puntos de interés pendientes de aprobar</h2>
            <div className="">
                <tr>
                    <th>Nombre</th>
                    <th>Categorías</th>
                </tr>
                {pending.map(element => {
                    return (
                        <tr className="">
                            <td className="">{element.name}</td>
                            <td className="">{element.categories}</td>

                            <td className="">
                                <button id={element._id} value="Aprobar" onClick={publish}>Aprobar</button>
                            </td>
                        </tr>
                    );
                })}
            </div>
        </div>
    )
}
