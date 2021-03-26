import { divide } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { DisabledPanelLink } from ".";
import {
    FeatureRequiredRights,
    getFeatureActivated,
    getFeatureInstalled,
    getIsAllowed
} from "../../utils";

function _link({ feature, requiredRights = null, to, label, right, ...props }) {
    // console.log("GuardedLink", feature);

    if (feature && !getFeatureInstalled(feature)) {
        return (
            <DisabledPanelLink
                className={props.className ? props.className : "panel-link"}
                label={label}
                preset="notinstalled"
                style={props.style}
            />
        );
    } else if (feature && !getFeatureActivated(feature)) {
        return (
            <DisabledPanelLink
                className={props.className ? props.className : "panel-link"}
                label={label}
                preset="notactivated"
                style={props.style}
            />
        );
    } else {
        if (feature) requiredRights = FeatureRequiredRights(feature);
        if (getIsAllowed(requiredRights))
            return (
                <Link
                    className={props.className ? props.className : "panel-link"}
                    to={to}
                    style={props.style}
                >
                    {label}
                </Link>
            );
        return null;
    }
}

export default _link;
