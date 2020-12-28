import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import PanelsNavBar from "../../components/PanelsNavBar";
import apiClient, { apiHeaders } from "../../services/api";
import { NotFound, Unathorized } from "../../views/errors";
import Scrolltotop from "../../components/ScrollToTop";
import { REQUIRED_RIGHT } from "../guards/types";
import { requireRight, waitOneSecond } from "../guards";
import {
    CompanyManagmentPanel,
    EnterpriseManagementPanel,
    MainPanel,
    StaffManagementPanel
} from ".";
import PanelsHome from "../../views/PanelsHome";
import { FormLoadingData } from "../../components/form-controls";

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
            <GuardProvider
                guards={[requireRight, waitOneSecond]}
                loading={FormLoadingData}
            >
                <Switch>
                    <Route exact path="/home" component={PanelsHome} />

                    <GuardedRoute
                        path="/enterprise-management"
                        component={EnterpriseManagementPanel}
                        meta={{
                            [REQUIRED_RIGHT]:
                                "access-enterprise-adminstration-panel"
                        }}
                    />

                    <GuardedRoute
                        path="/company-management"
                        component={CompanyManagmentPanel}
                        meta={{
                            [REQUIRED_RIGHT]: "access-company-management-panel"
                        }}
                    />
                    <GuardedRoute
                        path="/staff-management"
                        component={StaffManagementPanel}
                        meta={{
                            [REQUIRED_RIGHT]: "access-staff-management"
                        }}
                    />

                    <Route
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
