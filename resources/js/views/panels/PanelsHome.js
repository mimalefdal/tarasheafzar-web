import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getIsAllowed } from "../../utils";
import "../../styles/forms.css";

export default class PanelsHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cmsLink;
        if (getIsAllowed("access-cms-panel")) {
            cmsLink = (
                <Link className="panel-link" to="cms">
                    CMS Panel
                </Link>
            );
        }
        let staffManagementLink;

        if (getIsAllowed("access-staff-management")) {
            staffManagementLink = (
                <Link className="panel-link" to="staff-management">
                    Staff Management Panel
                </Link>
            );
        }

        return (
            <div>
                <div className="panel-welcome-title">
                    This is Panels Home Component
                </div>
                <div className="panel-links">
                    {cmsLink}
                    {staffManagementLink}
                </div>
            </div>
        );
    }
}
