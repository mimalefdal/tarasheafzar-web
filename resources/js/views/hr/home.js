import React, { Component } from "react";
import { t } from "../../utils";
import "../../styles/panels.css";
import { Link, useRouteMatch } from "react-router-dom";

export default function HrHome() {
    let match = useRouteMatch();
    return (
        <div>
            <div className="panel-welcome-title">
                {t("custum-titles.welcomeHumanResources")}
            </div>
            <div className="panel-links">
                <Link className="panel-link" to={`${match.url}/roles`}>
                    Manage Roles
                </Link>
            </div>
        </div>
    );
}
