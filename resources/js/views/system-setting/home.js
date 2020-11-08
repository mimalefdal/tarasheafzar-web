import React, { Component } from "react";
import { t } from "../../utils";
import "../../styles/panels.css";
import { Link, useRouteMatch } from "react-router-dom";

export default function SystemSetting() {
    let match = useRouteMatch();
    return (
        <div>
            <div className="panel-welcome-title">
                {t("custum-titles.welcomeSystemSetting")}
            </div>
            <div className="panel-links">
                <Link className="panel-link" to={`${match.url}/rights`}>
                    Manage Rights
                </Link>
            </div>
        </div>
    );
}
