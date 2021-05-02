import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";
import { NotFound } from "../../views/errors";
import { AccessPanelView } from "../../views/panels";
import { AdministrateRights, ManageRights } from "../../views/rights";
import { DefineRole, ManageRoles, ShowRole } from "../../views/roles";
import { FEATURE_READY } from "../guards/types";

function _Switch(props) {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={AccessPanelView} />
            <GuardedRoute
                // exact
                path={`${match.path}/rights_administration`}
                component={AdministrateRights}
                meta={{
                    [FEATURE_READY]: "rights-administration-tool"
                }}
            />
            <GuardedRoute
                // exact
                path={`${match.path}/rights_management`}
                component={ManageRights}
                meta={{
                    [FEATURE_READY]: "rights-management-tool"
                }}
            />

            <GuardedRoute
                // exact
                path={`${match.path}/roles`}
                component={ManageRoles}
                meta={{
                    [FEATURE_READY]: "roles-management-tool"
                }}
            />

            <GuardedRoute
                // exact
                path={`${match.path}/role/define`}
                component={DefineRole}
                meta={{
                    [FEATURE_READY]: "add-role-operation"
                }}
            />

            <GuardedRoute
                // exact
                path={`${match.path}/role/:slug`}
                component={ShowRole}
                meta={{
                    [FEATURE_READY]: "view-role-operation"
                }}
            />
            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default _Switch;
