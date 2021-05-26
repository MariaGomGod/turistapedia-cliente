export default function Pending() {

    return (
        <div>
            <h2 className="">Puntos de interés pendientes de aprobar</h2>
            <div className="">
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                </tr>
                {contacts.map((contact, index) => {
                    return (
                            <tr className="">
                                <td className=""></td>
                                <td className=""></td>
                            
                                <td className="">
                                    <span>Aprobar</span> 
                                </td>
                            </tr>
                    );
                })}
            </div>
        </div>
    )
}