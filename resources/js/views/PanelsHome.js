import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getIsAllowed, t } from "../utils";
import "../styles/panels.css";

export default class PanelsHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let companyManagmentPanelLink;
        if (getIsAllowed("access-company-management-panel")) {
            companyManagmentPanelLink = (
                <Link className="panel-link" to="/company-management">
                    {t("panels.company-management")}
                </Link>
            );
        }

        let cmsLink;
        if (getIsAllowed("access-cms-panel")) {
            cmsLink = (
                <Link className="panel-link" to="/cms">
                    {t("panels.cms")}
                </Link>
            );
        }

        let staffManagementLink;
        if (getIsAllowed("access-staff-management-panel")) {
            staffManagementLink = (
                <Link className="panel-link" to="/staff-management">
                    {t("panels.staff-management")}
                </Link>
            );
        }
        let systemManagementLink;
        if (getIsAllowed("access-enterprise-adminstration-panel")) {
            systemManagementLink = (
                <Link className="panel-link" to="/enterprise-management">
                    {t("panels.system-management")}
                </Link>
            );
        }

        let hrLink;
        // if (getIsAllowed("access-human-resources")) {
        if (getIsAllowed("access-hr-management-panel")) {
            hrLink = (
                <Link className="panel-link" to="/HR">
                    {t("panels.hr")}
                </Link>
            );
        }

        return (
            <div className="panel-body">
                <div className="panel-links">
                    {companyManagmentPanelLink}
                    {systemManagementLink}
                    {staffManagementLink}
                    {hrLink}
                    {cmsLink}
                </div>
            </div>
        );
    }
}
