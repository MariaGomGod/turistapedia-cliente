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
            <h3>Web&nbsp;oficial&nbsp;<span aria-hidden="true">/</span>&nbsp;red&nbsp;social&nbsp;y&nbsp;enlaces</h3>
            <div className="form-group">
                <div className="control">
                    <label htmlFor="official">Web&nbsp;oficial</label>
                    <input type="text" className="form-control" id="official" name="official" maxLength="500" defaultValue={getLink('official')} onInput={updateLink}></input>
                </div>
                <div className="control">
                    <label htmlFor="tripadvisor">Tripadvisor</label>
                    <input type="text" className="form-control" id="tripadvisor" name="tripadvisor" maxLength="500" defaultValue={getLink('tripadvisor')} onInput={updateLink}></input>
                </div>
                <div className="control">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" className="form-control" id="facebook" name="facebook" maxLength="500" defaultValue={getLink('facebook')} onInput={updateLink}></input>
                </div>
                <div className="control">
                    <label htmlFor="misc">Otros</label>
                    <input type="text" className="form-control" id="misc" name="misc" maxLength="500" defaultValue={getLink('misc')} onInput={updateLink}></input>
                </div>
            </div>
        </>
    )
}
