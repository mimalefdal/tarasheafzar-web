import React from "react";

function Layout(props) {
    return (
        <div className="layout-content flex horizontal-center">
            {props.children}
        </div>
    );
}

export default Layout;
