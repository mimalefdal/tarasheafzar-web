import React from "react";

function Layout(props) {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {props.children}
        </div>
    );
}

export default Layout;
