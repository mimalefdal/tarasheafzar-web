import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { GuardedLink } from "../../components/links";
import { HorizontalOperationBar } from "../../components/view-controls";
import { t } from "../../utils";
import { clearTitle, setTitle } from "../../utils/redux/navSlice";

export default function _View(props) {
    let match = useRouteMatch();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("panels.access-management")));
        // return () => {
        //     dispatch(clearTitle());
        // };
    }, []);

    return (
        <>
            <HorizontalOperationBar className="tool-links">
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
            </HorizontalOperationBar>
        </>
    );
}
