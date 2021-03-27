import React from "react";
import {
    FeatureRequiredRights,
    getIsAllowed,
    selectActionComponent
} from "../../utils";

function _guardedActionButton({
    action,
    feature,
    requiredRights = null,
    ...props
}) {
    if (feature && !getIsAllowed(FeatureRequiredRights(feature))) return null;
    if (requiredRights && !getIsAllowed(requiredRights)) return null;
    return selectActionComponent(action, props);
}

export default _guardedActionButton;
