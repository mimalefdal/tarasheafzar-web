import React, { Component } from "react";
import { t } from "../../utils";
import { Link, useRouteMatch } from "react-router-dom";
import { StaffDashboard } from "../staff-management";
import { AddFormRight } from "../../components/forms";

export default function StaffManagement() {
    let match = useRouteMatch();
    return (
        <>
            <div className="panel-links  responsive-inner-width">
                <Link className="panel-link" to={`${match.url}/dashboard`}>
                    Dashboard
                </Link>
                <Link className="panel-link" to={`${match.url}/manage`}>
                    Manage
                </Link>
            </div>
        </>
    );
}
