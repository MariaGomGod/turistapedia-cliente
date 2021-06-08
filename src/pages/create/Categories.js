export default function Categories({ setPointOfInterest }) {

    function updateCheckboxField(e, field) {

        // Creamos una función genérica para actualizar un campo de tipo array de strings, dado su nombre y el input que contiene su nuevo valor.
        // Si el input está marcado, el nuevo valor se añade al campo, de lo contrario, se eliminará.

        const checked = e.target.checked;
        const input = e.target.value;
        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest[field] = newPointOfInterest[field] || [];

            if (checked) {
                newPointOfInterest[field] = [...newPointOfInterest[field], input];
            } else {
                newPointOfInterest[field] = newPointOfInterest[field].filter(element => element !== input);
            }
            return newPointOfInterest;
        });
    }

    function updateCategories(e) {

        updateCheckboxField(e, "categories");

        const inputs = document.querySelectorAll('div#categories-checkbox input[type="checkbox"]');

        let atLeastOneChecked = false;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                atLeastOneChecked = true;
                break;
            }
        }

        inputs.forEach(element => element.required = !atLeastOneChecked);
    }

    return (
        <>
            <h3>Categorías</h3>
            <div id="categories-checkbox" className="form-group checkbox">
                <div className="control">
                    <label htmlFor="category-1">Restauración</label>
                    <input type="checkbox" id="category-1" value="restauración" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-2">Bar</label>
                    <input type="checkbox" id="category-2" value="bar" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-3">Restaurante</label>
                    <input type="checkbox" id="category-3" value="restaurante" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-4">Alojamiento</label>
                    <input type="checkbox" id="category-4" value="alojamiento" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-5">Hotel</label>
                    <input type="checkbox" id="category-5" value="hotel" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-6">Hostal</label>
                    <input type="checkbox" id="category-6" value="hostal" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-7">Apartamento</label>
                    <input type="checkbox" id="category-7" value="apartamento" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-8">Monumento</label>
                    <input type="checkbox" id="category-8" value="monumento" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-9">Puente</label>
                    <input type="checkbox" id="category-9" value="puente" onInput={updateCategories} required></input>
                </div>
                <div className="control">
                    <label htmlFor="category-10">Plaza</label>
                    <input type="checkbox" id="category-10" value="plaza" onInput={updateCategories} required></input>
                </div>
            </div>
        </>
    )
}
