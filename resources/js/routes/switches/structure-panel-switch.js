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
import { FEATURE_READY } from "../guards/types";

import { DefineBranch, ManageBranchs, ShowBranch } from "../../views/branches";
import {
    DefineDepartment,
    ManageDepartments,
    ShowDepartment
} from "../../views/departments";
import { CompanyInformation, CompanyStructure } from "../../views/company";
import { DefineUnit, EditUnit, ManageUnits, ShowUnit } from "../../views/units";
import {
    DefinePosition,
    EditPosition,
    ManagePositions,
    ShowPosition
} from "../../views/positions";
import { StructurePanelView } from "../../views/panels";
import {
    DefineJoblevel,
    EditJoblevel,
    ManageJoblevels,
    ShowJoblevel
} from "../../views/joblevels";

export default function _Switch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <GuardedRoute
                exact
                path={match.path}
                component={StructurePanelView}
            />
            <GuardedRoute
                path={`${match.path}/company/information`}
                component={CompanyInformation}
                meta={{
                    [FEATURE_READY]: "structure-management-panel"
                }}
            />

            <GuardedRoute
                path={`${match.path}/company/structure`}
                component={CompanyStructure}
                meta={{
                    [FEATURE_READY]: "structure-management-panel"
                }}
            />
            {/* Branches */}
            <GuardedRoute
                exact
                path={`${match.path}/branches`}
                component={ManageBranchs}
                meta={{
                    [FEATURE_READY]: "branches-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/branches/define`}
                component={DefineBranch}
                meta={{
                    [FEATURE_READY]: "branches-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/branches/:slug`}
                component={ShowBranch}
                meta={{
                    [FEATURE_READY]: "branches-management-tool"
                }}
            />

            {/* Departments */}
            <GuardedRoute
                exact
                path={`${match.path}/departments`}
                component={ManageDepartments}
                meta={{
                    [FEATURE_READY]: "departments-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/departments/define`}
                component={DefineDepartment}
                meta={{
                    [FEATURE_READY]: "departments-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/departments/:slug`}
                component={ShowDepartment}
                meta={{
                    [FEATURE_READY]: "departments-management-tool"
                }}
            />

            {/* Units */}
            <GuardedRoute
                exact
                path={`${match.path}/units`}
                component={ManageUnits}
                meta={{
                    [FEATURE_READY]: "units-management-tool"
                }}
            />

            <GuardedRoute
                exact
                path={`${match.path}/units/define`}
                component={DefineUnit}
                meta={{
                    [FEATURE_READY]: "units-management-tool"
                }}
            />

            <GuardedRoute
                exact
                path={`${match.path}/units/:slug`}
                component={ShowUnit}
                meta={{
                    [FEATURE_READY]: "units-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/units/edit/:slug/`}
                component={EditUnit}
                meta={{
                    [FEATURE_READY]: "units-management-tool"
                }}
            />

            {/* Joblevels */}
            <GuardedRoute
                exact
                path={`${match.path}/joblevels`}
                component={ManageJoblevels}
                meta={{
                    [FEATURE_READY]: "joblevels-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/joblevels/define`}
                component={DefineJoblevel}
                meta={{
                    [FEATURE_READY]: "joblevels-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/joblevels/:slug`}
                component={ShowJoblevel}
                meta={{
                    [FEATURE_READY]: "joblevels-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/joblevels/edit/:slug/`}
                component={EditJoblevel}
                meta={{
                    [FEATURE_READY]: "joblevels-management-tool"
                }}
            />

            {/* Positions */}
            <GuardedRoute
                exact
                path={`${match.path}/positions`}
                component={ManagePositions}
                meta={{
                    [FEATURE_READY]: "positions-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/positions/define`}
                component={DefinePosition}
                meta={{
                    [FEATURE_READY]: "positions-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/positions/:slug`}
                component={ShowPosition}
                meta={{
                    [FEATURE_READY]: "positions-management-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/positions/edit/:slug/`}
                component={EditPosition}
                meta={{
                    [FEATURE_READY]: "positions-management-tool"
                }}
            />

            <Route path={`${match.path}/*`} component={NotFound} />
        </Switch>
    );
}
