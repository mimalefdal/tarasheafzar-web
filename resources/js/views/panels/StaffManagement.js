import React, { Component } from "react";
import { t } from "../../utils";
import { AddFormRight } from "../../components/staff-management";
import "../../styles/panels.css";

export default class StaffManagement extends Component {
    render() {
        return (
            <div>
                <div className="panel-welcome-title">
                    {t("custum-titles.welcomeStaffManagement")}
                </div>

                <div style={{ width: "50%", margin: "auto" }}>
                    {/* <AddFormRight /> */}
                </div>
            </div>
        );
    }
}
