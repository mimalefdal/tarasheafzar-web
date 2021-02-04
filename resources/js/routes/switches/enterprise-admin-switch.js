import React from "react";

import { useRouteMatch, Switch, Route } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";

import { REQUIRED_RIGHT } from "../guards/types";

import { ManageRights } from "../../views/rights";
import { InitializeCeo, InitializeStart } from "../../views/initialize";
import { EnterprisePanelView } from "../../views";
import { Loading } from "../../components/feedback";

function EnterprisePanel(props) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={match.path} component={EnterprisePanelView} />
            <GuardedRoute
                exact
                path={`${match.path}/initialize`}
                component={InitializeStart}
                loading={Loading}
                meta={{
                    [REQUIRED_RIGHT]: "access-system-initialize-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/initialize/ceo`}
                component={InitializeCeo}
                loading={Loading}
                meta={{
                    [REQUIRED_RIGHT]: "access-system-initialize-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/rights`}
                component={ManageRights}
                meta={{
                    [REQUIRED_RIGHT]: "access-rights-adminstration-tool"
                }}
            />
        </Switch>
    );
}

export default EnterprisePanel;
