export default function Webs({ setPointOfInterest }) {

    function updateLink(e) {
        const link = e.target.value;
        const description = e.target.name;

        setPointOfInterest(currentPointOfInterest => {
            const newPointOfInterest = { ...currentPointOfInterest };
            newPointOfInterest.links = (newPointOfInterest.links || []).filter(element => element.description !== description);

            if (link) {
                newPointOfInterest.links = [...newPointOfInterest.links, {link: link, description: description}];
            }
            return newPointOfInterest;
        });
    }

    return (
        <>
            <h3>Web oficial/Red social y enlaces</h3>
            <div className="form-group">
                <div className="control">
                    <input type="text" className="form-control" placeholder="Web oficial" name="official" onInput={updateLink}></input>
                </div>
                <div className="control">
                    <input type="text" className="form-control" placeholder="Tripadvisor" name="tripadvisor" onInput={updateLink}></input>
                </div>
                <div className="control">
                    <input type="text" className="form-control" placeholder="Facebook" name="facebook" onInput={updateLink}></input>
                </div>
                <div className="control">
                    <input type="text" className="form-control" placeholder="Otros" name="misc" onInput={updateLink}></input>
                </div>
            </div>
        </>
    )
}
