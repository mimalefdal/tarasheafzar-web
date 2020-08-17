import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { requireRight, waitOneSecond } from "../router/panels/guards";
import { REQUIRED_RIGHT, RIGHT_ONLY } from "../router/panels/types";

import Scrolltotop from "../components/scrolltotop";
import CmsApp from "../views/panels/cmsApp";
import { Home } from "../views/panels";
import { Unathorized, NotFound } from "../views/errors";
import StaffManagement from "../views/panels/StaffManagement";

function PanelsApp(props) {
    let rights = JSON.parse(props.rights);
    let user = JSON.parse(props.user);
    console.log(user);

    rights.map(right => {
        sessionStorage.setItem(right.slug, true);
    });
    let appLocale = props.locale;
    sessionStorage.setItem("currentLanguage", appLocale);

    let headers = {
        Accept: "application/json"
    };
    let data = { userId: user.id };

    let token = user.api_token;
    console.log(token);
    sessionStorage.setItem("StaffAccessToken", token);

    // if (isNull(token)) {
    //     Axios.post("http://panels.localhost:8000/getToken", data, {
    //         headers
    //     }).then(response => {
    //         console.log("getToken:", response.data.token);
    //         sessionStorage.setItem("StaffAccessToken", response.data.token);
    //     });
    // }

    return (
        <BrowserRouter>
            <Scrolltotop />
            <GuardProvider guards={[requireRight, waitOneSecond]}>
                <Switch>
                    <GuardedRoute
                        exact
                        path="/home"
                        component={Home}
                        loading="Please wait ..."
                    />
                    <GuardedRoute
                        exact
                        path="/cms"
                        component={CmsApp}
                        loading="Please wait ..."
                        meta={{
                            [REQUIRED_RIGHT]: "access-cms"
                        }}
                    />
                    <GuardedRoute
                        exact
                        path="/staff-management"
                        component={StaffManagement}
                        loading="Please wait ..."
                        meta={{
                            [REQUIRED_RIGHT]: "add-staff"
                        }}
                    />
                    <GuardedRoute
                        exact
                        path="/unathorized"
                        component={Unathorized}
                        loading="redirecting..."
                    />

                    <Route path="*" component={NotFound} />
                </Switch>
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
