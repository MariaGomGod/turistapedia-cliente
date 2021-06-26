export default function Categories({ pointOfInterest, setPointOfInterest }) {

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

    function updateRequiredState() {
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

    function updateCategories(e) {

        updateCheckboxField(e, "categories");

        updateRequiredState();
    }

    function categoriesMissing() {
        // Con esta función indicamos que si el array de categorías es nulo o está vacío. Al no haber ninguna categoría marcada, hacemos que todas
        // sean obligatorias.
        return pointOfInterest.categories == null || pointOfInterest.categories.length === 0;
    }

    return (
        <>
            <h3>Categorías</h3>
            <div id="categories-checkbox" className="form-group checkbox">
                <div className="control">
                    <label htmlFor="category-1">Restauración</label>
                    {/* Para que en el formulario de la página de editar (Edit.js) se marquen todas las categorías que aplican al punto de interés elegido, en el atributo
                    defaultChecked se indica que si la categoría está incluída en el array de categorías que viene del backend, aparezca marcada inicialmente, en este caso, restauración. */}
                    <input type="checkbox" id="category-1" value="restauración" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('restauración')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-2">Bar</label>
                    <input type="checkbox" id="category-2" value="bar" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('bar')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-3">Restaurante</label>
                    <input type="checkbox" id="category-3" value="restaurante" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('restaurante')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-4">Alojamiento</label>
                    <input type="checkbox" id="category-4" value="alojamiento" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('alojamiento')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-5">Hotel</label>
                    <input type="checkbox" id="category-5" value="hotel" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('hotel')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-6">Hostal</label>
                    <input type="checkbox" id="category-6" value="hostal" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('hostal')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-7">Apartamento</label>
                    <input type="checkbox" id="category-7" value="apartamento" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('apartamento')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-8">Monumento</label>
                    <input type="checkbox" id="category-8" value="monumento" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('monumento')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-9">Puente</label>
                    <input type="checkbox" id="category-9" value="puente" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('puente')} required={categoriesMissing()}></input>
                </div>
                <div className="control">
                    <label htmlFor="category-10">Plaza</label>
                    <input type="checkbox" id="category-10" value="plaza" onInput={updateCategories} defaultChecked={pointOfInterest.categories?.includes('plaza')} required={categoriesMissing()}></input>
                </div>
            </div>
        </>
    )
}
