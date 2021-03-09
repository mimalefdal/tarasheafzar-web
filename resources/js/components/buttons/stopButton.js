import React from "react";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

function _button(props) {
    // console.log("StopButton", props);
    return (
        <button
            className={"operation-icon-btn " + props.className}
            style={props.style}
            onClick={props.onClick && props.onClick}
        >
            <RemoveCircleOutlineIcon />
        </button>
    );
}

export default _button;
