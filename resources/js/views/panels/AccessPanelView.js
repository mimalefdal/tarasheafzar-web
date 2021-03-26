import React from "react";
import { useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../../components/links";
import { t } from "../../utils";

export default function _View(props) {
    let match = useRouteMatch();

    return (
        <div className="tool-links">
            <GuardedLink
                className="tool-link"
                to={`${match.url}/rights_administration`}
                feature="rights-administration-tool"
                label={t("tools.rightsAdministration")}
            />
            <GuardedLink
                className="tool-link"
                to={`${match.url}/rights_management`}
                feature="rights-management-tool"
                label={t("tools.rightsManagement")}
            />
        </div>
    );
}
