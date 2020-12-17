import React, { Component } from "react";
import { t } from "../../utils";

import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import { CompanyManagementHome } from "../../views/company";

export default function CompanyPanel() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route
                    exact
                    path={match.path}
                    component={CompanyManagementHome}
                />
            </Switch>
        </div>
    );
}
