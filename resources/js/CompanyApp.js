import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import PanelsNavBar from "./components/PanelsNavBar";
import Scrolltotop from "./components/ScrollToTop";
import { requireRight, waitOneSecond } from "./routes/guards";
import { FormLoadingData } from "./components/form-controls";
import CoreApp from "./routes/switches/CoreApp";
import { Provider } from "react-redux";
import store from "./features/redux/store";
import { ApiClient } from "./services";

function CompanyApp(props) {
    sessionStorage.clear();
    // const [ready, setReady] = useState(false);

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

    // ApiClient.get("sanctum/csrf-cookie")
    //     .then(response => {
    //         // console.log(response);
    //         setReady(true);
    //     })
    //     .catch(error => {
    //         console.log("");
    //         console.log(error.response);
    //     });

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

export default CompanyApp;

if (document.getElementById("panels-app")) {
    const element = document.getElementById("panels-app");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <Provider store={store}>
            <CompanyApp {...props} />
        </Provider>,
        element
    );
}
