import React from "react";

function viewControl(props) {
    return (
        <div className={props.className}>
            <div>
                <div className="title-line">{props.pretitle}</div>
                <div className="title-text">{props.title}</div>
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div className="btn-set">{props.btnSet}</div>
        </div>
    );
}

export default viewControl;
