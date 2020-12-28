import React, { Component } from "react";
import { t } from "../../utils";
import "../../styles/panels.css";
import { Link, useRouteMatch } from "react-router-dom";
import { StaffDashboard } from "../staff-management";
import { AddFormRight } from "../../components/forms";

export default function StaffManagement() {
    let match = useRouteMatch();
    return (
        <div>
            <div className="panel-welcome-title">
                {t("custum-titles.welcomeStaffManagement")}
            </div>
            <div className="panel-links">
                <Link className="panel-link" to={`${match.url}/dashboard`}>
                    Dashboard
                </Link>
                <Link className="panel-link" to={`${match.url}/manage`}>
                    Manage
                </Link>
            </div>
        </div>
    );
}
