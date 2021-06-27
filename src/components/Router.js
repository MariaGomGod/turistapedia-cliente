import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Destination from "../pages/Destination";
import Create from "../pages/create/Create";
import StreetMap from "../pages/StreetMap";
import Register from "../pages/Register";
import Error from "../pages/Error";
import ResetPassword from "../pages/ResetPassword";
import ListPointOfInterest from "../pages/edit/ListPointOfInterest";
import EditPointOfInterest from "../pages/edit/EditPointOfInterest";

export default function Router() {

    return (
        <div>
            
            <BrowserRouter>
                {/* <Header>

                </Header> */}

                <Switch>

                    <Route exact path="/login" render={() => {
                        return localStorage.getItem("user")
                            ?  <Redirect to="/" />
                            :  <Login />
                    }} />

                    <Route exact path="/register" render={() => {
                        return localStorage.getItem("user")
                        ?  <Redirect to="/" />
                        :  <Register />
                    }} />

                    <Route exact path="/destination" component={Destination} />

                    <Route exact path="/create" render={() => {
                        return localStorage.getItem("user")
                            ? <Create />
                            : <Redirect to="/login" />
                    }} />

                    <Route exact path="/admin/all" render={() => {
                        const authenticatedUser = localStorage.getItem("user");

                        return authenticatedUser ?
                            JSON.parse(authenticatedUser).admin ? <ListPointOfInterest /> : <Redirect to="/error" />
                            : <Redirect to="/login" />
                    }} />

                    <Route exact path="/admin/edit/:id" render={() => {
                        const authenticatedUser = localStorage.getItem("user");

                        return authenticatedUser ?
                            JSON.parse(authenticatedUser).admin ? <EditPointOfInterest /> : <Redirect to="/error" />
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