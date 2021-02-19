import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";
import { NotFound } from "../../views/errors";
import { AccessPanelView } from "../../views/panels";
import { AdministrateRights, ManageRights } from "../../views/rights";
import { REQUIRED_RIGHT } from "../guards/types";

function _Switch(props) {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={AccessPanelView} />
            <GuardedRoute
                exact
                path={`${match.path}/rights_administration`}
                component={AdministrateRights}
                meta={{
                    [REQUIRED_RIGHT]: "access-rights-adminstration-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/rights_management`}
                component={ManageRights}
                meta={{
                    [REQUIRED_RIGHT]: "access-rights-management-tool"
                }}
            />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default _Switch;
