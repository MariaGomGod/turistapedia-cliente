import './Filters.sass';

export default function Filters({ setCategories }) {

    function handleClick(e) {
        const input = e.target;
        if (input.checked) {
            setCategories(currentCategories => [...currentCategories, input.value]);
        } else {
            setCategories(currentCategories => currentCategories.filter(category => category !== input.value));
        }
    }

    return (
        <div id="filters">
            <div id="filter1">
                <h3>Filtrar&nbsp;por&nbsp;categorías</h3>
                <input type="checkbox" id="category-1" value="restauración" onChange={handleClick} defaultChecked={true}></input>
                <label htmlFor="category-1">&nbsp;Restauración</label><br></br>
                <input type="checkbox" id="category-2" value="alojamiento" onChange={handleClick} defaultChecked={true}></input>
                <label htmlFor="category-2">&nbsp;Alojamiento</label><br></br>
                <input type="checkbox" id="category-3" value="puente" onChange={handleClick} defaultChecked={true}></input>
                <label htmlFor="category-3">&nbsp;Puente</label><br></br>
                <input type="checkbox" id="category-4" value="plaza" onChange={handleClick} defaultChecked={true}></input>
                <label htmlFor="category-4">&nbsp;Plaza</label>
            </div>

            <div id="filter2">
                <h3>Filtrar&nbsp;por&nbsp;accesibilidad</h3>
                <input type="checkbox" id="accesible-1" value="sanitarios adaptados" defaultChecked={true}></input>
                <label htmlFor="accesible-1">&nbsp;Sanitarios&nbsp;adaptados</label><br></br>
                <input type="checkbox" id="accesible-2" value="acceso adaptado" defaultChecked={true}></input>
                <label htmlFor="accesible-2">&nbsp;Acceso&nbsp;adaptado</label><br></br>
                <input type="checkbox" id="accesible-3" value="habitación adaptada" defaultChecked={true}></input>
                <label htmlFor="accesible-3">&nbsp;Habitación&nbsp;adaptada</label><br></br>
                <input type="checkbox" id="accesible-4" value="audio guía" defaultChecked={true}></input>
                <label htmlFor="accesible-4">&nbsp;Audio&nbsp;guía</label>
            </div>
        </div>
    )
}