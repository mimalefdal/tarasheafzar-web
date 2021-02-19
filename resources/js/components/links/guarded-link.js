import React from "react";
import { Link } from "react-router-dom";
import { getIsAllowed } from "../../utils";

function _link({ requiredRight, to, label, right, ...props }) {
    if (getIsAllowed(requiredRight)) {
        return (
            <Link
                className={props.className ? props.className : "panel-link"}
                to={to}
            >
                {label}
            </Link>
        );
    }
    return null;
}

export default _link;
