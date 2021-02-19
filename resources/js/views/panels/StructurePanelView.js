import React, { Component, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { t } from "../../utils";

export default function _View() {
    let match = useRouteMatch();
    return (
        <Fragment>
            <div className="tool-links">
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

                <Link
                    className="tool-link"
                    // to={`${match.url}/branches`}
                    to={{
                        pathname: `${match.url}/branches`,
                        state: { prev: location.pathname }
                    }}
                    style={{ order: 1 }}
                >
                    {t("tools.branchesManagement")}
                </Link>
                <Link
                    className="tool-link"
                    to={`${match.url}/departments`}
                    style={{ order: 2 }}
                >
                    {t("tools.departmentsManagement")}
                </Link>
                <Link
                    className="tool-link"
                    to={`${match.url}/units`}
                    style={{ order: 3 }}
                >
                    {t("tools.unitsManagement")}
                </Link>
                <Link
                    className="tool-link"
                    to={`${match.url}/positions`}
                    style={{ order: 4 }}
                >
                    {t("tools.positionsManagement")}
                </Link>
                {/* <Link className="panel-link" to={`${match.url}/company`}>
                    Company Information
                </Link> */}
            </div>
        </Fragment>
    );
}
