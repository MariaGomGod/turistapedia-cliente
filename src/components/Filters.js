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
            <h3>Filtrar&nbsp;por&nbsp;categorías</h3>
            <input type="checkbox" id="category-1" value="restauración" onChange={handleClick} defaultChecked={true}></input>
            <label htmlFor="category-1">&nbsp;Restauración</label><br></br>
            <input type="checkbox" id="category-2" value="alojamiento" onChange={handleClick} defaultChecked={true}></input>
            <label htmlFor="category-2">&nbsp;Alojamiento</label><br></br>
            <input type="checkbox" id="category-4" value="puente" onChange={handleClick} defaultChecked={true}></input>
            <label htmlFor="category-4">&nbsp;Puente</label><br></br>
            <input type="checkbox" id="category-5" value="plaza" onChange={handleClick} defaultChecked={true}></input>
            <label htmlFor="category-5">&nbsp;Plaza</label>
        </div>
    )
}