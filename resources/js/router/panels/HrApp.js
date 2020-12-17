import React from "react";

import { useRouteMatch, Switch, Route } from "react-router-dom";
import { HrHome } from "../../views/hr";

function HrApp(props) {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={match.path} component={HrHome} />
                {/* <Route
                    exact
                    path={`${match.path}/roles`}
                    component={}
                /> */}
            </Switch>
        </div>
    );
}

export default HrApp;
