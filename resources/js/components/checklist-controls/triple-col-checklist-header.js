import React from "react";
import { t } from "../../utils";

function Control(props) {
    return (
        <tr>
            <th className="checklist-text-cell first">{t("labels.stages")}</th>
            <th className="">{t("labels.status")}</th>
            <th className="checklist-text-cell last">{t("labels.comments")}</th>
        </tr>
    );
}

export default Control;
