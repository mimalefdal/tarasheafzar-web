import React from "react";

function control({ option, active, ...props }) {
    return (
        <div
            // key={index}
            className={"list-option" + (active ? " active" : "")}
            onClick={props.onClick}
        >
            {option.label}
        </div>
    );
}

export default control;
