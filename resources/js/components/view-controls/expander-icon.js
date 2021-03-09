import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function _control({
    expandIcon = <ExpandMoreIcon />,
    isExpanded = false,
    ...props
}) {
    const [expanded, setExpanded] = useState(isExpanded);

    useEffect(() => {
        setExpanded(isExpanded);
    }, [isExpanded]);

    return (
        <div
            className={
                "operation-icon-btn " +
                props.className +
                (expanded ? " active" : "")
            }
        >
            {expandIcon}
        </div>
    );
}

export default _control;
