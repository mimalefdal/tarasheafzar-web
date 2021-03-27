import React from "react";

import { useRouteMatch, Switch, Route } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";

import { FEATURE_READY } from "../guards/types";

import { ManageRights } from "../../views/rights";
import { InitializeCeo, InitializeStart } from "../../views/initialize";
import { Loading } from "../../components/feedback";
import { SystemPanelView } from "../../views/panels";
import { ManageFeatures } from "../../views/features";
import { NotFound } from "../../views/errors";

function _Switch(props) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={match.path} component={SystemPanelView} />
            <GuardedRoute
                exact
                path={`${match.path}/initialize`}
                component={InitializeStart}
                loading={Loading}
                meta={{
                    [FEATURE_READY]: "system-initialize-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/initialize/ceo`}
                component={InitializeCeo}
                loading={Loading}
                meta={{
                    [FEATURE_READY]: "define-ceo-operation"
                }}
            />
            <GuardedRoute
                // exact
                path={`${match.path}/features`}
                component={ManageFeatures}
                loading={Loading}
                meta={{
                    [FEATURE_READY]: "features-management-tool"
                }}
            />
            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default _Switch;
