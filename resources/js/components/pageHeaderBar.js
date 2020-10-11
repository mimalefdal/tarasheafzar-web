import React from "react";

function pageHeaderBar(props) {
    return (
        <div className={props.className + " page-header general-shadow"}>
            {props.children}
        </div>
    );
}

export default pageHeaderBar;
