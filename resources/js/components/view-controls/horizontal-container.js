import React from "react";

function _control(props) {
    return (
        <div
            className={(props.className ? props.className : "") + " horizontal"}
        >
            {props.children}
        </div>
    );
}

export default _control;
