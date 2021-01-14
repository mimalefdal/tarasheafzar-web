import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getIsAllowed, t } from "../utils";
import "../styles/panels.css";
import { useDispatch } from "react-redux";
import { clearTitle, setTitle } from "../features/redux/navSlice";

export default function PanelsHome(props) {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle(t("custum-titles.welcome")));
        return () => {
            dispatch(clearTitle());
        };
    }, []);

    let structureManagmentPanelLink;
    if (getIsAllowed("access-structure-management-panel")) {
        structureManagmentPanelLink = (
            <>
                <Link
                    className="panel-link"
                    to={{
                        pathname: "/structure-management",
                        state: { prev: location.pathname }
                    }}
                >
                    {t("panels.structure-management")}
                </Link>
                {/* Temp */}
                <Link className="panel-link" to={`/rights`}>
                    {t("tools.rightsManagement")}
                </Link>
                <Link className="panel-link" to={`/staff`}>
                    {t("tools.staffManagement")}
                </Link>
                {/* Temp End */}
            </>
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
    if (getIsAllowed("access-hr-management-panel")) {
        hrLink = (
            <Link className="panel-link" to="/HR">
                {t("panels.hr")}
            </Link>
        );
    }

    return (
        <div className="panel-links ">
            {structureManagmentPanelLink}
            {systemManagementLink}
            {staffManagementLink}
            {hrLink}
            {cmsLink}
        </div>
    );
}
