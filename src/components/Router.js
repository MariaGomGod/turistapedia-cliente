import { BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "../pages/Login";
import Destination from "../pages/Destination";
import Pending from "../pages/Pending";
import New from "../pages/New";
import StreetMap from "../pages/StreetMap";
import Error from "../pages/Error";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/destination" component={Destination} />
                    <Route exact path="/pending" component={Pending} />
                    <Route exact path="/new" component={New} />
                    <Route exact path="/map" component={StreetMap} />

                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}