import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { requireRight, waitOneSecond } from "../guards";
import { REQUIRED_RIGHT, RIGHT_ONLY } from "../types";

import Scrolltotop from "../../../components/scrolltotop";
import { Unathorized, NotFound } from "../../../views/errors";
import PanelsNavBar from "../../../components/PanelsNavBar";
import PanelsHome from "../../../views/PanelsHome";
import CmsApp from "./CmsApp";
import StaffManagement from "./StaffManagement";
import SystemSetting from "./SystemSetting";
import HrApp from "./hrApp";

function PanelsApp(props) {
    sessionStorage.clear();

    let rights = JSON.parse(props.rights);
    let user = JSON.parse(props.user);
    let appLocale = props.locale;
    let appEnv = props.env;
    let token = user.api_token;

    rights.map(right => {
        sessionStorage.setItem(right.slug, true);
    });
    sessionStorage.setItem("currentLanguage", appLocale);
    sessionStorage.setItem("StaffAccessToken", token);
    sessionStorage.setItem("ENV", appEnv);

    console.log(appEnv);
    return (
        <BrowserRouter>
            <PanelsNavBar />
            <Scrolltotop />
            <GuardProvider guards={[requireRight, waitOneSecond]}>
                <Switch>
                    <GuardedRoute
                        exact
                        path="/home"
                        component={PanelsHome}
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
                        path="/staff-management"
                        component={StaffManagement}
                        loading="Please wait ..."
                        meta={{
                            [REQUIRED_RIGHT]: "access-staff-management"
                        }}
                    />

                    <GuardedRoute
                        path="/System"
                        component={SystemSetting}
                        loading="Please wait ..."
                        meta={{
                            [REQUIRED_RIGHT]: "access-system-setting"
                        }}
                    />

                    <GuardedRoute
                        path="/HR"
                        component={HrApp}
                        loading="Please wait ..."
                        meta={{
                            // [REQUIRED_RIGHT]: "access-hr-panel",
                            [REQUIRED_RIGHT]: "access-staff-management"
                        }}
                    />

                    <GuardedRoute
                        exact
                        path="/unathorized"
                        component={Unathorized}
                        loading="redirecting..."
                    />
                    {/* <Route
                        path="/staff-management/test"
                        component={AddFormRight}
                    /> */}
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
