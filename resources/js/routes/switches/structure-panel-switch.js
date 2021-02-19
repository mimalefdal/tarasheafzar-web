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

export default function _Switch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={StructurePanelView} />
            <GuardedRoute
                path={`${match.path}/company/information`}
                component={CompanyInformation}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            <GuardedRoute
                path={`${match.path}/company/structure`}
                component={CompanyStructure}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            {/* Branches */}
            <GuardedRoute
                exact
                path={`${match.path}/branches`}
                component={ManageBranchs}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                path={`${match.path}/branches/define`}
                component={DefineBranch}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/branches/:slug`}
                component={ShowBranch}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            {/* Departments */}
            <GuardedRoute
                exact
                path={`${match.path}/departments`}
                component={ManageDepartments}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/departments/define`}
                component={DefineDepartment}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/departments/:slug`}
                component={ShowDepartment}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            {/* Units */}
            <GuardedRoute
                exact
                path={`${match.path}/units`}
                component={ManageUnits}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            <GuardedRoute
                exact
                path={`${match.path}/units/define`}
                component={DefineUnit}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            <GuardedRoute
                exact
                path={`${match.path}/units/:slug`}
                component={ShowUnit}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/units/edit/:slug/`}
                component={EditUnit}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            {/* Positions */}
            <GuardedRoute
                exact
                path={`${match.path}/positions`}
                component={ManagePositions}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/positions/define`}
                component={DefinePosition}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/positions/:slug`}
                component={ShowPosition}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/positions/edit/:slug/`}
                component={EditPosition}
                meta={{
                    [REQUIRED_RIGHT]: "access-structure-panel"
                }}
            />

            <Route path={`${match.path}/*`} component={NotFound} />
        </Switch>
    );
}
