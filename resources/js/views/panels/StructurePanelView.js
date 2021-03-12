import React, { Component, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../../components/links";
import { t } from "../../utils";

export default function _View() {
    let match = useRouteMatch();
    return (
        <Fragment>
            <div className="tool-links horizontal">
                {/* <Link
                    className="panel-link"
                    to={`${match.url}/company/information`}
                >
                    Company Information
                </Link>
                <Link
                    className="panel-link"
                    to={`${match.url}/company/structure`}
                >
                    View Company Structure
                </Link> */}

                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/branches`}
                    feature="branches-management-tool"
                    requiredRight="access-structure-panel"
                    label={t("tools.branchesManagement")}
                    style={{ order: 1 }}
                />
                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/departments`}
                    // feature="departments-management-tool"
                    requiredRight="access-structure-panel"
                    label={t("tools.departmentsManagement")}
                    style={{ order: 1 }}
                />

                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/units`}
                    // feature="units-management-tool"
                    requiredRight="access-structure-panel"
                    label={t("tools.unitsManagement")}
                    style={{ order: 3 }}
                />

                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/joblevels`}
                    // feature="joblevels-management-tool"
                    requiredRight="access-structure-panel"
                    label={t("tools.joblevelsManagement")}
                    style={{ order: 4 }}
                />

                <GuardedLink
                    className="tool-link horizontal"
                    to={`${match.url}/positions`}
                    // feature="positions-management-tool"
                    requiredRight="access-structure-panel"
                    label={t("tools.positionsManagement")}
                    style={{ order: 5 }}
                />

                {/* <Link className="panel-link" to={`${match.url}/company`}>
                    Company Information
                </Link> */}
            </div>
        </Fragment>
    );
}
