import React from "react";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { NoItems } from "../list-controls";
function _button(props) {
    // console.log("SuspendTogglerButton", props);
    return (
        <button
            className={"operation-icon-btn " + props.className}
            style={props.style}
            onClick={props.onClick && props.onClick}
        >
            {props.item.suspended ? (
                <PlayCircleOutlineIcon />
            ) : (
                <PauseCircleOutlineIcon />
            )}
        </button>
    );
}

export default _button;
