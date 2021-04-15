import React, { Component, useEffect } from "react";
import { t } from "../../utils";
import { Link, useRouteMatch } from "react-router-dom";
import { StaffDashboard } from "../staff-management";
import { AddFormRight } from "../../components/forms";
import { StaffManagementMDashboard } from "../../view-components";
import { GuardedLink } from "../../components/links";
import { useDispatch } from "react-redux";
import { setTitle } from "../../utils/redux/navSlice";
import { HorizontalOperationBar } from "../../components/view-controls";

export default function StaffManagement() {
    let match = useRouteMatch();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("panels.staff-management")));
    }, []);

    return (
        <>
            <HorizontalOperationBar className="tool-links">
                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/manage`}
                    feature="staff-management-tool"
                    label={t("tools.staffManagement")}
                    style={{ order: 1 }}
                />
                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/list`}
                    feature="staff-list-tool"
                    label={t("tools.staffList")}
                    style={{ order: 1 }}
                />
            </HorizontalOperationBar>
            {/* <StaffManagementMDashboard /> */}
        </>
    );
}
