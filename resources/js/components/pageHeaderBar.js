import React from "react";

function _pageHeaderBar(props) {
    return (
        <div
            className={
                "page-header general-shadow " +
                (props.className ? props.className : "")
            }
        >
            {props.children}
        </div>
    );
}

export default _pageHeaderBar;
