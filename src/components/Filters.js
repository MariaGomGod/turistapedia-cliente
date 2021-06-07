import './Filters.sass';

export default function Filters({ setCategories, setAccessible }) {

    function handleCategoryClicked(e) {
        const input = e.target;
        if (input.checked) {
            setCategories(currentCategories => [...currentCategories, input.value]);
        } else {
            setCategories(currentCategories => currentCategories.filter(category => category !== input.value));
        }
    }

    function handleAccessibleClicked(e) {
        const input = e.target;
        if (input.checked) {
            setAccessible(currentAccessible => [...currentAccessible, input.value]);
        } else {
            setAccessible(currentAccessible => currentAccessible.filter(accessible => accessible !== input.value));
        }
    }

    return (
        <div id="filters">
            <div className="border-section">
                <div id="filter-wrapper">
                    <div className="filter">
                        <h3>Filtrar&nbsp;por&nbsp;categorías</h3>
                        <input type="checkbox" id="category-1" value="restauración" onChange={handleCategoryClicked} defaultChecked={true}></input>
                        <label htmlFor="category-1">Restauración</label><br></br>
                        <input type="checkbox" id="category-2" value="alojamiento" onChange={handleCategoryClicked} defaultChecked={true}></input>
                        <label htmlFor="category-2">Alojamiento</label><br></br>
                        <input type="checkbox" id="category-3" value="monumento" onChange={handleCategoryClicked} defaultChecked={true}></input>
                        <label htmlFor="category-3">Monumento</label><br></br>
                        <input type="checkbox" id="category-3" value="puente" onChange={handleCategoryClicked} defaultChecked={true}></input>
                        <label htmlFor="category-3">Puente</label><br></br>
                        <input type="checkbox" id="category-4" value="plaza" onChange={handleCategoryClicked} defaultChecked={true}></input>
                        <label htmlFor="category-4">Plaza</label>
                    </div>

                    <div className="filter">
                        <h3>Filtrar&nbsp;por&nbsp;accesibilidad</h3>
                        <input type="checkbox" id="accesible-1" value="adaptedToilet" onChange={handleAccessibleClicked}></input>
                        <label htmlFor="accesible-1">Sanitarios&nbsp;adaptados</label><br></br>
                        <input type="checkbox" id="accesible-2" value="adaptedAccess" onChange={handleAccessibleClicked}></input>
                        <label htmlFor="accesible-2">Acceso&nbsp;adaptado</label><br></br>
                        <input type="checkbox" id="accesible-3" value="adaptedRoom" onChange={handleAccessibleClicked}></input>
                        <label htmlFor="accesible-3">Habitación&nbsp;adaptada</label><br></br>
                        <input type="checkbox" id="accesible-4" value="audioGuide" onChange={handleAccessibleClicked}></input>
                        <label htmlFor="accesible-4">Audio&nbsp;guía</label>
                    </div>
                </div>
            </div>
        </div>
    )
}