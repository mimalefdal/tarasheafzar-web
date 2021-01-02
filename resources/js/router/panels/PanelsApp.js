import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import PanelsNavBar from "../../components/PanelsNavBar";
import apiClient, { apiHeaders } from "../../services/api";
import Scrolltotop from "../../components/ScrollToTop";
import { requireRight, waitOneSecond } from "../guards";
import { FormLoadingData } from "../../components/form-controls";
import CoreApp from "./CoreApp";

function PanelsApp(props) {
    sessionStorage.clear();

    // console.log("rendered", props);
    // console.log(props.rights);

    let rights = JSON.parse(props.rights);
    let user = JSON.parse(props.user);
    let appLocale = props.locale;
    let appEnv = props.env;
    let token = user.api_token;

    if (rights != null) {
        rights.map(right => {
            sessionStorage.setItem(right.slug, true);
        });
    }
    sessionStorage.setItem("currentLanguage", appLocale);
    sessionStorage.setItem("StaffAccessToken", token);
    sessionStorage.setItem("ENV", appEnv);

    // console.log(appEnv);

    apiClient
        .get("sanctum/csrf-cookie", { headers: apiHeaders })
        .then(response => {
            // console.log(response);
        });

    return (
        <BrowserRouter>
            <PanelsNavBar />
            <Scrolltotop />
            <Switch>
                <Route exact path="/">
                    <Redirect to="home" />
                </Route>
            </Switch>
            <GuardProvider
                guards={[requireRight, waitOneSecond]}
                loading={FormLoadingData}
            >
                <CoreApp />
            </GuardProvider>
        </BrowserRouter>
    );
}

export default PanelsApp;

if (document.getElementById("panels-app")) {
    const element = document.getElementById("panels-app");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<PanelsApp {...props} />, element);
}
