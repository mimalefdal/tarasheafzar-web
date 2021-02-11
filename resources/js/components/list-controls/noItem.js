import React, { useEffect } from "react";
import { t } from "../../utils";

function control({ message = null, ...props }) {
    useEffect(() => {
        // console.log(message);
    }, [message]);

    return <div> {message ? message : t("expressions.noItemsToShow")} </div>;
}

export default control;
