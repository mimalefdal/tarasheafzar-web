import { divide } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { DisabledPanelLink } from ".";
import {
    getFeatureActivated,
    getFeatureInstalled,
    getIsAllowed
} from "../../utils";

function _link({ requiredRight, feature, to, label, right, ...props }) {
    // console.log("GuardedLink", feature);
    if (getIsAllowed(requiredRight)) {
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
            return (
                <Link
                    className={props.className ? props.className : "panel-link"}
                    to={to}
                    style={props.style}
                >
                    {label}
                </Link>
            );
        }
    }
    return null;
}

export default _link;
