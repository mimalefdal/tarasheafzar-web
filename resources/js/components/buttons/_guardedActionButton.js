import React from "react";
import { getIsAllowed, selectActionComponent } from "../../utils";

function _guardedActionButton({ action, requiredRight, ...props }) {
    if (getIsAllowed(requiredRight)) {
        return selectActionComponent(action, props);
    }
    return null;
}

export default _guardedActionButton;
