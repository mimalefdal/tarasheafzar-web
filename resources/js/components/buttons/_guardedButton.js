import React from "react";
import { getIsAllowed } from "../../utils";

function _button({ requiredRights = null, title, ...props }) {
    if (requiredRights && !getIsAllowed(requiredRights)) return null;

    return <button {...props}>{title}</button>;
}

export default _button;
