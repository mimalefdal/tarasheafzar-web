import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getIsAllowed, t } from "../../utils";
import "../../styles/forms.css";

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

        return (
            <div className="panel-body">
                <div className="panel-links">
                    {systemSettingsLink}
                    {staffManagementLink}
                    {cmsLink}
                    <a className="panel-link" href="http://crm.localhost:8000">
                        {t("panels.crm")}
                    </a>
                </div>
            </div>
        );
    }
}
