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
                feature="system-initialize-tool"
                label={t("tools.systemInitialize")}
            />
            <GuardedLink
                className="tool-link"
                to={`${match.url}/features`}
                feature="features-management-tool"
                label={t("tools.featuresManagement")}
            />
        </div>
    );
}
