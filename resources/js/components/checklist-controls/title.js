import React from "react";
import PropTypes from "prop-types";

function Control(props) {
    return (
        <div className="list-title">
            <div className="items-ribbon">
                <div className="title-text list-title-text">{props.title}</div>
                <div style={{ flexGrow: 1 }}></div>
                <div className="btn-set">{props.btnSet}</div>
            </div>
        </div>
    );
}

export default Control;
