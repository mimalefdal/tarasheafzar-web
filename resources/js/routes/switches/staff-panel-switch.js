import React, { Component } from "react";
import { t } from "../../utils";

import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import { StaffManagementPanelView } from "../../views/panels";
import { GuardedRoute } from "react-router-guards";
import { FEATURE_READY, REQUIRED_RIGHT } from "../guards/types";
import { NotFound } from "../../views/errors";
import {
    DefineStaff,
    EditStaff,
    ListStaff,
    ManageStaff,
    ShowStaff
} from "../../views/staff-management";

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
                component={ManageStaff}
                meta={{
                    [FEATURE_READY]: "staff-management-tool"
                }}
            />

            <GuardedRoute
                exact
                path={`${match.path}/list`}
                component={ListStaff}
                meta={{
                    [FEATURE_READY]: "staff-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/define`}
                component={DefineStaff}
                meta={{
                    [FEATURE_READY]: "staff-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/:personnel_id`}
                component={ShowStaff}
                meta={{
                    [FEATURE_READY]: "staff-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/edit/:personnel_id`}
                component={EditStaff}
                meta={{
                    [FEATURE_READY]: "staff-management-tool",
                    [REQUIRED_RIGHT]: "edit-staff"
                }}
            />

            <Route path={`${match.path}/*`} component={NotFound} />
        </Switch>
    );
}
