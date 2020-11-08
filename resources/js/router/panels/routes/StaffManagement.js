import React, { Component } from "react";
import { t } from "../../../utils";

import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import {
    StaffManagementHome,
    StaffManagementManage,
    StaffManagementMDashboard
} from "../../../views/staff-management";

export default function StaffManagement() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route
                    exact
                    path={match.path}
                    component={StaffManagementHome}
                />
                <Route
                    exact
                    path={`${match.path}/dashboard`}
                    component={StaffManagementMDashboard}
                />
                <Route
                    exact
                    path={`${match.path}/manage`}
                    component={StaffManagementManage}
                />
            </Switch>
        </div>
    );
}
