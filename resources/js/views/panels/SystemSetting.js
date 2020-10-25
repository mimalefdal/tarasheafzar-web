import React from "react";
import { t } from "../../utils";
import "../../styles/panels.css";
import {
    SystemSettingManageRights,
    SystemSettingHome,
    SystemSettingManageRoles,
    SystemSettingAddRight
} from "../system-setting";
import { useRouteMatch, Switch, Route } from "react-router-dom";

function systemSetting(props) {
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

export default systemSetting;
