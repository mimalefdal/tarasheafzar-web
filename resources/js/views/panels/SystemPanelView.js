import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../../components/links";
import { t } from "../../utils";
import { setTitle } from "../../utils/redux/navSlice";

export default function _View() {
    let match = useRouteMatch();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("panels.system-management")));
    }, []);

    return (
        <div className="tool-links horizontal">
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
