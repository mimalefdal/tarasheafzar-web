import React, { Component, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../../components/links";
import { HorizontalOperationBar } from "../../components/view-controls";
import { t } from "../../utils";
import { setTitle } from "../../utils/redux/navSlice";

export default function _View() {
    let match = useRouteMatch();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("panels.structure-management")));
    }, []);

    return (
        <>
            <HorizontalOperationBar className="tool-links">
                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/company`}
                    feature="company-info-tool"
                    label={t("tools.companyManagement")}
                    style={{ order: 1 }}
                />

                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/branches`}
                    feature="branches-management-tool"
                    label={t("tools.branchesManagement")}
                    style={{ order: 1 }}
                />
                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/departments`}
                    feature="departments-management-tool"
                    label={t("tools.departmentsManagement")}
                    style={{ order: 1 }}
                />

                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/units`}
                    feature="units-management-tool"
                    label={t("tools.unitsManagement")}
                    style={{ order: 3 }}
                />

                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/joblevels`}
                    feature="joblevels-management-tool"
                    label={t("tools.joblevelsManagement")}
                    style={{ order: 4 }}
                />

                <GuardedLink
                    className="tool-link"
                    to={`${match.url}/positions`}
                    feature="positions-management-tool"
                    label={t("tools.positionsManagement")}
                    style={{ order: 5 }}
                />

                {/* <Link className="panel-link" to={`${match.url}/company`}>
                    Company Information
                </Link> */}
            </HorizontalOperationBar>
        </>
    );
}
