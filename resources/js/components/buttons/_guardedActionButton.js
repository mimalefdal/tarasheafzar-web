import React from "react";
import { getIsAllowed, selectActionComponent } from "../../utils";

function _guardedActionButton({ action, requiredRights, ...props }) {
    if (getIsAllowed(requiredRights)) {
        return selectActionComponent(action, props);
    }
    return null;
}

export default _guardedActionButton;
