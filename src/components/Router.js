import { BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "../pages/Login";
import Destination from "../pages/Destination";
import Map from "../pages/Map";
import Error from "../pages/Error";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/destination" component={Destination} />
                    <Route exact path="/Map" component={Map} />

                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}