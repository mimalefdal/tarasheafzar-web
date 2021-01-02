import React from "react";

import { useRouteMatch, Switch, Route } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";

import { REQUIRED_RIGHT } from "../guards/types";

import { RightsAdd, RightsManagement } from "../../views/rights";
import { InitializeCeo, InitializeStart } from "../../views/initialize";
import { FormLoadingData } from "../../components/form-controls";
import { EnterprisePanelView } from "../../views";

function EnterprisePanel(props) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={match.path} component={EnterprisePanelView} />
            <GuardedRoute
                exact
                path={`${match.path}/initialize`}
                component={InitializeStart}
                loading={FormLoadingData}
                meta={{
                    [REQUIRED_RIGHT]: "access-system-initialize-tool"
                }}
            />
            <GuardedRoute
                exact
                path={`${match.path}/initialize/ceo`}
                component={InitializeCeo}
                loading={FormLoadingData}
                meta={{
                    [REQUIRED_RIGHT]: "access-system-initialize-tool"
                }}
            />

            <GuardedRoute
                exact
                path={`${match.path}/rights`}
                component={RightsManagement}
                loading={FormLoadingData}
                meta={{
                    [REQUIRED_RIGHT]: "access-rights-management-tool"
                }}
            />

            <Route
                exact
                path={`${match.path}/right/add`}
                component={RightsAdd}
            />
        </Switch>
    );
}

export default EnterprisePanel;
