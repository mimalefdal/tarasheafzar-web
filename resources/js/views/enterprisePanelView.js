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

    let ManageRightsLink;
    if (getIsAllowed("access-rights-management-tool")) {
        ManageRightsLink = (
            <Link className="panel-link" to={`${match.url}/rights`}>
                {t("tools.rightsManagement")}
            </Link>
        );
    }

    return (
        <div>
            <div className="panel-links  ">
                {initializeEnterpriseLink}
                {ManageRightsLink}
            </div>
        </div>
    );
}
