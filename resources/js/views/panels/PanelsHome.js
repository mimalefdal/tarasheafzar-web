import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/panels.css";
import { t } from "../../utils";
import { GuardedLink } from "../../components/links";
import { clearTitle, setTitle } from "../../utils/redux/navSlice";

export default function _View(props) {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle(t("page-titles.welcome")));
        return () => {
            dispatch(clearTitle());
        };
    }, []);

    return (
        <div className="panel-links ">
            <GuardedLink
                to={{
                    pathname: "/structure",
                    state: { prev: location.pathname }
                }}
                feature="structure-management-panel"
                requiredRight="access-structure-panel"
                label={t("panels.structure-management")}
            />

            <GuardedLink
                to="/enterprise"
                feature="enterprise-administration-panel"
                requiredRight="access-enterprise-panel"
                label={t("panels.system-management")}
            />

            <GuardedLink
                to="/access"
                feature="access-management-panel"
                requiredRight="access-access-panel"
                label={t("panels.access-management")}
            />
        </div>
    );
}
