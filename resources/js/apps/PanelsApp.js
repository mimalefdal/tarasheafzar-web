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
    sessionStorage.clear();

    let rights = JSON.parse(props.rights);
    let user = JSON.parse(props.user);
    let appLocale = props.locale;
    let token = user.api_token;

    rights.map(right => {
        sessionStorage.setItem(right.slug, true);
    });
    sessionStorage.setItem("currentLanguage", appLocale);
    sessionStorage.setItem("StaffAccessToken", token);

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
                            [REQUIRED_RIGHT]: "access-cms-panel"
                        }}
                    />
                    <GuardedRoute
                        exact
                        path="/staff-management"
                        component={StaffManagement}
                        loading="Please wait ..."
                        meta={{
                            [REQUIRED_RIGHT]: "access-staff-management"
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
