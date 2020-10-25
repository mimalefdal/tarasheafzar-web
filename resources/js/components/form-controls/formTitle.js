import React from "react";

function formTitle(props) {
    return (
        <div className={props.className + " form-title"}>
            <div className="title-line"></div>
            <div className="title-text">{props.title}</div>
        </div>
    );
}

export default formTitle;
