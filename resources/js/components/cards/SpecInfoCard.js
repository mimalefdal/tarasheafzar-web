import React from "react";

function _card({ spec, value, unit, ...props }) {
    return (
        <div id="spec-card" className="flex column">
            <div id="spec-title">{spec}</div>
            <div id="spec-info">
                {" "}
                {value} {unit}{" "}
            </div>
        </div>
    );
}

export default _card;
