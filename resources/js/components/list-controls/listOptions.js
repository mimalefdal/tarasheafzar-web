import React from "react";
import { Children } from "react";

function _control(props) {
    return (
        <div
            className={
                "list-options-box flex row" +
                (props.className && " " + props.className)
            }
        >
            {props.children}
        </div>
    );
}

export default _control;
