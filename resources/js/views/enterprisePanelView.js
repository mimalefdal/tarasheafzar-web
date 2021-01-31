import React, { Component } from "react";
import { getIsAllowed, t } from "../utils";
import { Link, useRouteMatch } from "react-router-dom";

export default function viewComponent() {
    let match = useRouteMatch();

    let initializeEnterpriseLink;
    if (getIsAllowed("access-system-initialize-tool")) {
        initializeEnterpriseLink = (
            <Link className="panel-link" to={`${match.url}/initialize`}>
                {t("tools.systemInitialize")}
            </Link>
        );
    }

    let AdminRightsLink;
    if (getIsAllowed("access-rights-adminstration-tool")) {
        AdminRightsLink = (
            <Link className="panel-link" to={`/rights`}>
                {t("tools.rightsAdministration")}
            </Link>
        );
    }

    return (
        <div>
            <div className="panel-links  ">
                {initializeEnterpriseLink}
                {AdminRightsLink}
            </div>
        </div>
    );
}
