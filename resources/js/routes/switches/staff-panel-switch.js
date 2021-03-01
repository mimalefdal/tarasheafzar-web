import React, { Component } from "react";
import { t } from "../../utils";

import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import { StaffManagementManage } from "../../views/staff-management";
import { StaffManagementPanelView } from "../../views/panels";
import { GuardedRoute } from "react-router-guards";
import { FEATURE_READY } from "../guards/types";
import { NotFound } from "../../views/errors";

export default function _Switch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route
                exact
                path={match.path}
                component={StaffManagementPanelView}
            />
            <GuardedRoute
                exact
                path={`${match.path}/manage`}
                component={StaffManagementManage}
                meta={{
                    [FEATURE_READY]: "staff-management-tool"
                }}
            />

            <Route path={`${match.path}/*`} component={NotFound} />
        </Switch>
    );
}
