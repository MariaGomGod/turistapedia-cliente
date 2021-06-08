export default function Photos() {
    return (
        <>
            <h3>Fotografías</h3>
            <div className="form-group">
                <div className="control">
                    <label htmlFor="foto-1">&nbsp;Foto&nbsp;1</label>
                    <input type="text" className="form-control" placeholder="Enlace" name="foto-1"></input>
                    <input type="text" className="form-control" placeholder="Descripción" name="desc-foto-1"></input>
                </div>
                <div className="control">
                    <label htmlFor="foto-2">&nbsp;Foto&nbsp;2</label>
                    <input type="text" className="form-control" placeholder="Enlace" name="foto-2"></input>
                    <input type="text" className="form-control" placeholder="Descripción" name="desc-foto-2"></input>
                </div>
                <div className="control">
                    <label htmlFor="foto-3">&nbsp;Foto&nbsp;3</label>
                    <input type="text" className="form-control" placeholder="Enlace" name="foto-3"></input>
                    <input type="text" className="form-control" placeholder="Descripción" name="desc-foto-3"></input>
                </div>
            </div>
        </>
    )
}
