import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { DoneSharp } from "@material-ui/icons";
import { t } from "../../utils";
import { Loading } from "../feedback";

function Control({
    loadstate,
    itemTitle,
    itemStatus,
    prerequisite = true,
    itemComment,
    ...props
}) {
    let match = useRouteMatch();

    const [loading, setLoading] = useState(loading);

    useEffect(() => {
        // console.log("loadstate", loadstate);
        setLoading(loadstate);
    }, [loadstate]);

    useEffect(() => {
        // console.log("checklistItem", props.label, prerequisite, itemStatus);
    }, [prerequisite, itemStatus]);

    return (
        <tr>
            <td className="checklist-text-cell first">{itemTitle}</td>
            <td style={{ alignItems: "center" }}>
                {loading ? (
                    <div className="flex-center">
                        <Loading type="spin" />
                    </div>
                ) : !prerequisite ? (
                    <button className="btn btn-primary checklist-btn" disabled>
                        {props.label}
                    </button>
                ) : itemStatus ? (
                    <button className="btn btn-primary checklist-btn" disabled>
                        <DoneSharp />
                    </button>
                ) : props.target ? (
                    <Link
                        className="btn btn-primary checklist-btn"
                        to={`${match.url}/${props.target}`}
                    >
                        {props.label}
                    </Link>
                ) : (
                    <button
                        className="btn btn-primary checklist-btn"
                        onClick={props.callback && props.callback}
                    >
                        {props.label}
                    </button>
                )}
            </td>
            <td className="checklist-text-cell last">
                {!loading && itemComment}
            </td>
        </tr>
    );
}

export default Control;
