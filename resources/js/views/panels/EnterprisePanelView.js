import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../../components/links";
import { t } from "../../utils";

export default function _View() {
    let match = useRouteMatch();

    return (
        <div className="tool-links">
            <GuardedLink
                className="tool-link"
                to={`${match.url}/initialize`}
                requiredRight="access-system-initialize-tool"
                label={t("tools.systemInitialize")}
            />
            <GuardedLink
                to={`${match.url}/rights`}
                requiredRight="access-rights-adminstration-tool"
                label={t("tools.rightsAdministration")}
            />
        </div>
    );
}
