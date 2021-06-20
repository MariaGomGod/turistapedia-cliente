import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useContext } from 'react';

import Login from "../pages/Login";
import Destination from "../pages/Destination";
import Pending from "../pages/Pending";
import Create from "../pages/create/Create";
import StreetMap from "../pages/StreetMap";
import Register from "../pages/Register";
import Error from "../pages/Error";
import ResetPassword from "../pages/ResetPassword";
import { GlobalContext } from "../App";

export default function Router() {

    const { authenticatedUser } = useContext(GlobalContext);

    return (
        <div>
            <BrowserRouter>
                <Switch>

                    <Route exact path="/login" render={() => {
                        return authenticatedUser.email
                            ?  <Redirect to="/" />
                            :  <Login />
                    }} />

                    <Route exact path="/register" render={() => {
                        return authenticatedUser.email
                        ?  <Redirect to="/" />
                        :  <Register />
                    }} />

                    <Route exact path="/destination" component={Destination} />

                    <Route exact path="/create" render={() => {
                        return authenticatedUser.email
                            ? <Create />
                            : <Redirect to="/login" />
                    }} />

                    <Route exact path="/pending" render={() => {
                        return authenticatedUser.email ?
                            authenticatedUser.admin ? <Pending /> : <Redirect to="/error" />
                            : <Redirect to="/login" />
                    }} />

                    <Route exact path="/map" component={StreetMap} />
                    <Route exact path="/reset-password" component={ResetPassword} />

                    <Route exact path="/">
                        <Redirect to="/destination" />
                    </Route>

                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}