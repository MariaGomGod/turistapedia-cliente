export default function Webs({ pointOfInterest, setPointOfInterest }) {

    function updateLink(e) {
        const link = e.target.value;
        const description = e.target.name;

        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest.links = newPointOfInterest.links || [];
            newPointOfInterest.links = newPointOfInterest.links.filter(element => element.description !== description);

            if (link) {
                newPointOfInterest.links = [...newPointOfInterest.links, {link: link, description: description}];
            }
            return newPointOfInterest;
        });
    }

    const getLink = description => { 
        // Rellenamos cada link de la página de editar puntos de interés (Edit.js) indicando que encuentre el link que coincida con su descripción.
        // Si existe que lo pinte usando la propiedad link y si no, devolvemos una cadena vacía, lo que provocará que el input quede vacío.
        const linkObject = (pointOfInterest.links || []).find(link => link.description === description);
        return linkObject == null ? '' : linkObject.link || '';
    };

    return (
        <>
            <h3>Web oficial/Red social y enlaces</h3>
            <div className="form-group">
                <div className="control">
                    <input type="text" className="form-control" placeholder="Web oficial" name="official" defaultValue={getLink('official')} onInput={updateLink}></input>
                </div>
                <div className="control">
                    <input type="text" className="form-control" placeholder="Tripadvisor" name="tripadvisor" defaultValue={getLink('tripadvisor')} onInput={updateLink}></input>
                </div>
                <div className="control">
                    <input type="text" className="form-control" placeholder="Facebook" name="facebook" defaultValue={getLink('facebook')} onInput={updateLink}></input>
                </div>
                <div className="control">
                    <input type="text" className="form-control" placeholder="Otros" name="misc" defaultValue={getLink('misc')} onInput={updateLink}></input>
                </div>
            </div>
        </>
    )
}
