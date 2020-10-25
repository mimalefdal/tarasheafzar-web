import React, { Component } from "react";
import { t } from "../../utils";
import "../../styles/panels.css";
import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import { StaffDashboard, StaffHome } from "../staff-management";
import { AddFormRight } from "../../components/forms";
import { Unathorized, NewPage } from "../errors";

export default function StaffManagement() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={match.path} component={StaffHome} />
                <Route
                    exact
                    path={`${match.path}/dashboard`}
                    component={StaffDashboard}
                />
            </Switch>
        </div>
    );
}
