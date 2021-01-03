import React, { Component, Fragment } from "react";
import { t } from "../utils";
import { Link, useRouteMatch } from "react-router-dom";
import { AddFormRight } from "../components/forms";
import { Unathorized } from "./errors";

export default function viewComponent() {
    let match = useRouteMatch();
    return (
        <Fragment>
            <div className="panel-links  responsive-inner-width">
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
                <Link className="panel-link" to={`${match.url}/rights`}>
                    {t("tools.rightsManagement")}
                </Link>
                <Link
                    className="panel-link"
                    // to={`${match.url}/branchs`}
                    to={{
                        pathname: `${match.url}/branchs`,
                        state: { prev: location.pathname }
                    }}
                    style={{ order: 1 }}
                >
                    {t("tools.branchsManagement")}
                </Link>
                <Link
                    className="panel-link"
                    to={`${match.url}/departments`}
                    style={{ order: 2 }}
                >
                    {t("tools.departmentsManagement")}
                </Link>
                <Link
                    className="panel-link"
                    to={`${match.url}/units`}
                    style={{ order: 3 }}
                >
                    {t("tools.unitsManagement")}
                </Link>
                <Link
                    className="panel-link"
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
