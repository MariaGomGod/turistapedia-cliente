import './New.sass';

export default function New() {
    return (
        <div id="new-poi">
            <h1>Nuevo punto de interés</h1>
            <form>
                <div className="form-section">
                    <h3>Datos principales</h3>
                    <div className="form-group">
                        <div class="control">

                            <label for="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Introduzca el nombre"></input>
                        </div>
                        <div class="control">
                            <label for="description">Descripción</label>
                            <input type="textarea" className="form-control" id="description"></input>
                        </div>
                    </div>

                    <h3>Coordenadas</h3>
                    <div className="form-group">
                        <div class="control">
                            <label for="latitude">Latitud</label>
                            <input type="text" className="form-control" id="latitude" placeholder="Introduzca la latitud"></input><br />
                        </div>
                        <div class="control">
                            <label for="logitude">Longitud</label>
                            <input type="text" className="form-control" id="longitude" placeholder="Introduzca la longitud"></input>
                        </div>
                    </div>

                    <h3>Categorías</h3>
                    <div id="categories-checkbox" className="form-group checkbox">
                        <div class="control">
                            <label htmlFor="category-1">Restauración</label>
                            <input type="checkbox" id="category-1" value="restauración" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-2">Bar</label>
                            <input type="checkbox" id="category-2" value="bar" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-3">Restaurante</label>
                            <input type="checkbox" id="category-3" value="restaurante" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-4">Alojamiento</label>
                            <input type="checkbox" id="category-4" value="alojamiento" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-5">Hotel</label>
                            <input type="checkbox" id="category-5" value="hotel" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-6">Hostal</label>
                            <input type="checkbox" id="category-6" value="hostal" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-7">Apartamento</label>
                            <input type="checkbox" id="category-7" value="apartamento" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-8">Monumento</label>
                            <input type="checkbox" id="category-8" value="monumento" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-9">Puente</label>
                            <input type="checkbox" id="category-9" value="puente" defaultChecked={true}></input>
                        </div>
                        <div class="control">
                            <label htmlFor="category-10">Plaza</label>
                            <input type="checkbox" id="category-10" value="plaza" defaultChecked={true}></input>
                        </div>
                    </div>
                </div>
                <div className="form-section">
                    <h3>Accesibilidad</h3>
                    <div id="accesible-checkbox" className="form-group checkbox">
                        <div class="control">

                            <label htmlFor="accesible-1">Sanitarios&nbsp;adaptados</label>
                            <input type="checkbox" id="accesible-1" value="adaptedToilet" defaultChecked={true}></input><br />
                        </div>
                        <div class="control">
                            <label htmlFor="accesible-2">Acceso&nbsp;adaptado</label>
                            <input type="checkbox" id="accesible-2" value="adaptedAcces" defaultChecked={true}></input><br />
                        </div>
                        <div class="control">
                            <label htmlFor="accesible-3">Habitaciones&nbsp;adaptadas</label>
                            <input type="checkbox" id="accesible-3" value="adaptedRoom" defaultChecked={true}></input><br />
                        </div>
                        <div class="control">
                            <label htmlFor="accesible-4">Audio&nbsp;guía</label>
                            <input type="checkbox" id="accesible-4" value="audioGuide" defaultChecked={true}></input><br />
                        </div>
                    </div>
                    <h3>Web oficial/Red social y enlaces</h3>
                    <div className="form-group">
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Web oficial" name="official"></input>
                        </div>
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Tripadvisor" name="tripadvisor"></input>
                        </div>
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Facebook" name="facebook"></input>
                        </div>
                        <div class="control">
                            <input type="text" className="form-control" placeholder="Otros" name="misc"></input>
                        </div>
                    </div>
                    <h3>Fotografías</h3>
                    <div className="form-group">
                        <div class="control">
                            <label htmlFor="foto-1">&nbsp;Foto&nbsp;1</label>
                            <input type="file" name="foto" id="foto-1"></input>
                        </div>
                        <div class="control">
                            <label htmlFor="foto-2">&nbsp;Foto&nbsp;2</label>
                            <input type="file" name="foto" id="foto-2"></input>
                        </div>
                        <div class="control">
                            <label htmlFor="foto-3">&nbsp;Foto&nbsp;3</label>
                            <input type="file" name="foto" id="foto-3"></input>
                        </div>
                    </div>
                </div>
                <button type="submit" className="button">Enviar</button>
            </form>
        </div>);
}