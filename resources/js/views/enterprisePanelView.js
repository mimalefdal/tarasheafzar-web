import React, { Component } from "react";
import { getIsAllowed, t } from "../utils";
import { Link, useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../components/links";

export default function viewComponent() {
    let match = useRouteMatch();

    return (
        <div>
            <div className="panel-links">
                <GuardedLink
                    to={`${match.url}/initialize`}
                    requiredRight="access-system-initialize-tool"
                    label={t("tools.systemInitialize")}
                />
                <GuardedLink
                    to={`${match.url}/rights`}
                    requiredRight="access-rights-adminstration-tool"
                    label={t("tools.rightsAdministration")}
                />
            </div>
        </div>
    );
}
