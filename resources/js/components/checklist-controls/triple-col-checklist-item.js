import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FormLoadingData } from "../form-controls";
import { DoneSharp } from "@material-ui/icons";
import { t } from "../../utils";

function Control({ loadstate, itemTitle, itemStatus, itemComment }, props) {
    let match = useRouteMatch();

    const [loading, setLoading] = useState(loadstate);

    useEffect(() => {
        // console.log("loadstate", loadstate);
    });
    return (
        <tr>
            <td className="checklist-text-cell first">{itemTitle}</td>
            <td>
                {loadstate ? (
                    <FormLoadingData type="spin" />
                ) : itemStatus ? (
                    <button className="btn btn-primary checklist-btn" disabled>
                        <DoneSharp />
                    </button>
                ) : (
                    <Link
                        className="btn btn-primary checklist-btn"
                        to={`${match.url}/ceo`}
                    >
                        {t("buttons.InitializeCEO")}
                    </Link>
                )}
            </td>
            {!loadstate && (
                <td className="checklist-text-cell last">{itemComment}</td>
            )}
        </tr>
    );
}

export default Control;