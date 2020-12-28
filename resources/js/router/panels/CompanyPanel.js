import React, { Component } from "react";
import { t } from "../../utils";

import {
    Link,
    useRouteMatch,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import { NotFound } from "../../views/errors";
import { GuardedRoute } from "react-router-guards";
import { REQUIRED_RIGHT } from "../guards/types";

import { CompanyPanelView } from "../../views";
import { DefineBranch, ManageBranchs } from "../../views/branchs";
import { CompanyInformation, CompanyStructure } from "../../views/company";
import { ManageUnits } from "../../views/units";
import { ManagePositions } from "../../views/positions";
import { ManageDepartments } from "../../views/departments";

export default function CompanyPanel() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={match.path} component={CompanyPanelView} />
                <GuardedRoute
                    path={`${match.path}/company/information`}
                    component={CompanyInformation}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />

                <GuardedRoute
                    path={`${match.path}/company/structure`}
                    component={CompanyStructure}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />
                <GuardedRoute
                    exact
                    path={`${match.path}/branchs`}
                    component={ManageBranchs}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />
                <GuardedRoute
                    path={`${match.path}/branchs/define`}
                    component={DefineBranch}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />
                <GuardedRoute
                    exact
                    path={`${match.path}/departments`}
                    component={ManageDepartments}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />
                <GuardedRoute
                    exact
                    path={`${match.path}/units`}
                    component={ManageUnits}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />
                <GuardedRoute
                    exact
                    path={`${match.path}/positions`}
                    component={ManagePositions}
                    meta={{
                        [REQUIRED_RIGHT]: "access-company-management-panel"
                    }}
                />

                <Route path={`${match.path}/*`} component={NotFound} />
            </Switch>
        </div>
    );
}
