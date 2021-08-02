export default function Photos({ pointOfInterest, setPointOfInterest }) {

    function updatePhotos(e) {
        
        setPointOfInterest(currentPointOfInterest => {
            const links = Array.from(document.querySelectorAll("div#photos input.link")); // Nos traemos del DOM todos los links.
            const descriptions = Array.from(document.querySelectorAll("div#photos input.description")); // Nos traemos del DOM todas las descripciones.
            let photos = Array(links.length); // Creo un array vacío para almacenar los objetos de tipo photo.
            for (let i = 0; i < links.length; i++) { // Recorremos el array de enlaces (hubiera sido lo mismo hacerlo con el de descripciones).
                photos[i] = { link: links[i].value, description: descriptions[i].value };
            }
            photos = photos.filter(photo => photo.link != null && photo.link !== ''); // Elimino las fotos cuyo enlace es nulo o vacío

            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest.photos = photos; // Machacamos lo que hubiera en photos por el array de photos que acabamos de calcular.
            return newPointOfInterest;
        });
    }

    const getLink = position => {
        // Rellenamos el enlace de cada foto de la página de editar puntos de interés (Edit.js) indicando que encuentre el link que coincida con su posición.
        // Si existe que lo pinte usando la propiedad link y si no, devolvemos una cadena vacía, lo que provocará que el input quede vacío.
        const photo = (pointOfInterest.photos || [])[position];
        return photo == null ? '' : photo.link || '';
    };

    const getDescription = position => {
        // Rellenamos la descripción de cada foto de la página de editar puntos de interés (Edit.js) indicando que encuentre el link que coincida con su posición.
        // Si existe que lo pinte usando la propiedad description y si no, devolvemos una cadena vacía, lo que provocará que el input quede vacío.
        const photo = (pointOfInterest.photos || [])[position];
        return photo == null ? '' : photo.description || '';
    };

    return (
        <>
            <h3>Fotografías</h3>
            <div id="photos" className="form-group">
                <div className="control">
                    <label htmlFor="foto-1">&nbsp;Foto&nbsp;1</label>
                    <input type="text" className="form-control link" placeholder="Enlace" maxLength="500" id="foto-1" name="foto-1" defaultValue={getLink(0)} onInput={updatePhotos}></input>
                    <input type="text" className="form-control description" placeholder="Descripción" maxLength="500"  name="desc-foto-1" defaultValue={getDescription(0)} onInput={updatePhotos}></input>
                </div>
                <div className="control">
                    <label htmlFor="foto-2">&nbsp;Foto&nbsp;2</label>
                    <input type="text" className="form-control link" placeholder="Enlace" maxLength="500" id="foto-2" name="foto-2" defaultValue={getLink(1)} onInput={updatePhotos}></input>
                    <input type="text" className="form-control description" placeholder="Descripción" maxLength="500" name="desc-foto-2" defaultValue={getDescription(1)} onInput={updatePhotos}></input>
                </div>
                <div className="control">
                    <label htmlFor="foto-3">&nbsp;Foto&nbsp;3</label>
                    <input type="text" className="form-control link" placeholder="Enlace" maxLength="500" id="foto-3" name="foto-3" defaultValue={getLink(2)} onInput={updatePhotos}></input>
                    <input type="text" className="form-control description" placeholder="Descripción" maxLength="500" name="desc-foto-3" defaultValue={getDescription(2)} onInput={updatePhotos}></input>
                </div>
            </div>
        </>
    )
}
