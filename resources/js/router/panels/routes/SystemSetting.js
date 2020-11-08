import React from "react";
import {
    SystemSettingManageRights,
    SystemSettingHome,
    SystemSettingManageRoles,
    SystemSettingAddRight
} from "../../../views/system-setting";
import { useRouteMatch, Switch, Route } from "react-router-dom";

function SystemSetting(props) {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={match.path} component={SystemSettingHome} />
                <Route
                    exact
                    path={`${match.path}/rights`}
                    component={SystemSettingManageRights}
                />
                <Route
                    exact
                    path={`${match.path}/right/add`}
                    component={SystemSettingAddRight}
                />
                <Route
                    exact
                    path={`${match.path}/roles`}
                    component={SystemSettingManageRights}
                />
            </Switch>
        </div>
    );
}

export default SystemSetting;
