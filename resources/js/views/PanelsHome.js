import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getIsAllowed, t } from "../utils";
import "../styles/panels.css";
import { useDispatch } from "react-redux";
import { clearTitle, setTitle } from "../utils/redux/navSlice";
import { GuardedLink } from "../components/links";

export default function PanelsHome(props) {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle(t("custum-titles.welcome")));
        return () => {
            dispatch(clearTitle());
        };
    }, []);

    return (
        <div className="panel-links ">
            <GuardedLink
                to={{
                    pathname: "/structure-management",
                    state: { prev: location.pathname }
                }}
                requiredRight="access-structure-management-panel"
                label={t("panels.structure-management")}
            />
            <GuardedLink
                to="/enterprise-management"
                requiredRight="access-enterprise-adminstration-panel"
                label={t("panels.system-management")}
            />
        </div>
    );
}
