import React, { Component } from "react";
import { t } from "../../utils";
import "../../styles/panels.css";
import { Link, useRouteMatch } from "react-router-dom";
import { StaffDashboard } from "../staff-management";
import { AddFormRight } from "../../components/forms";
import { Unathorized } from "../errors";

export default function viewComponent() {
    let match = useRouteMatch();
    return (
        <div>
            <div className="panel-welcome-title">
                {t("custum-titles.welcomeCompanyManagement")}
            </div>
            <div className="panel-links">
                {/* <Link className="panel-link" to={`${match.url}/dashboard`}>
                    Dashboard
                </Link> */}
            </div>
        </div>
    );
}
