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
        // return () => {
        //     dispatch(clearTitle());
        // };
    }, []);

    return (
        <div className="panel-links  ">
            <GuardedLink
                className="panel-link  "
                to={{
                    pathname: "/structure",
                    state: { prev: location.pathname }
                }}
                feature="structure-management-panel"
                // requiredRights="access-structure-panel"
                label={t("panels.structure-management")}
            />

            <GuardedLink
                className="panel-link  "
                to="/system"
                feature="system-panel"
                // requiredRights="access-system-panel"
                label={t("panels.system-management")}
            />

            <GuardedLink
                className="panel-link  "
                to="/access"
                feature="access-management-panel"
                // requiredRights="access-access-management-panel"
                label={t("panels.access-management")}
            />
            <GuardedLink
                className="panel-link  "
                to="/staff"
                feature="staff-management-panel"
                // requiredRights="access-staff-management-panel"
                label={t("panels.staff-management")}
            />
        </div>
    );
}
