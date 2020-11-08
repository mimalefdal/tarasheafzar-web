import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getIsAllowed, t } from "../utils";
import "../styles/panels.css";

export default class PanelsHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cmsLink;
        if (getIsAllowed("access-cms-panel")) {
            cmsLink = (
                <Link className="panel-link" to="/cms">
                    {t("panels.cms")}
                </Link>
            );
        }

        let staffManagementLink;
        if (getIsAllowed("access-staff-management")) {
            staffManagementLink = (
                <Link className="panel-link" to="/staff-management">
                    {t("panels.staff-management")}
                </Link>
            );
        }
        let systemSettingsLink;
        if (getIsAllowed("access-system-setting")) {
            systemSettingsLink = (
                <Link className="panel-link" to="/system">
                    {t("panels.system-management")}
                </Link>
            );
        }

        let hrLink;
        // if (getIsAllowed("access-human-resources")) {
        if (getIsAllowed("access-staff-management")) {
            hrLink = (
                <Link className="panel-link" to="/HR">
                    {t("panels.hr")}
                </Link>
            );
        }

        return (
            <div className="panel-body">
                <div className="panel-links">
                    {systemSettingsLink}
                    {staffManagementLink}
                    {hrLink}
                    {cmsLink}
                </div>
            </div>
        );
    }
}
