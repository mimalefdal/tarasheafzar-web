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
        if (getIsAllowed("access-cms")) {
            cmsLink = <Link to="cms">CMS</Link>;
        }
        let staffManagementLink;

        if (getIsAllowed("add-staff")) {
            staffManagementLink = (
                <Link to="staff-management">Staff Management</Link>
            );
        }

        return (
            <div>
                <div>This is Staff Home Component</div>
                {cmsLink} {staffManagementLink}
            </div>
        );
    }
}
