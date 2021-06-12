import { BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "../pages/Login";
import Destination from "../pages/Destination";
import Pending from "../pages/Pending";
import Create from "../pages/create/Create";
import StreetMap from "../pages/StreetMap";
import Register from "../pages/Register";
import Error from "../pages/Error";
import SecurityQuestion from "../pages/SecurityQuestion";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/destination" component={Destination} />
                    <Route exact path="/pending" component={Pending} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/map" component={StreetMap} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/security-question" component={SecurityQuestion} />

                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}