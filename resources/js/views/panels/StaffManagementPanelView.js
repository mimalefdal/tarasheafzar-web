import React, { Component } from "react";
import { t } from "../../utils";
import { Link, useRouteMatch } from "react-router-dom";
import { StaffDashboard } from "../staff-management";
import { AddFormRight } from "../../components/forms";
import { StaffManagementMDashboard } from "../../view-components";
import { GuardedLink } from "../../components/links";

export default function StaffManagement() {
    let match = useRouteMatch();
    return (
        <>
            <div className="tool-links horizontal ">
                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/manage`}
                    feature="staff-management-tool"
                    requiredRight="access-staff-management-tool"
                    label={t("tools.staffManagement")}
                    style={{ order: 1 }}
                />
                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/list`}
                    feature="staff-management-tool"
                    requiredRight="access-staff-management-tool"
                    label={t("tools.staffList")}
                    style={{ order: 1 }}
                />
            </div>
            {/* <StaffManagementMDashboard /> */}
        </>
    );
}
