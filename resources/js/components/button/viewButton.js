import React from "react";
import View from "../../assets/images/visibility.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

function viewButton(props) {
    return (
        <Link
            className={
                "operation-icon-btn table-operation-icon-btn " + props.className
            }
            style={props.style}
            to={props.target}
        >
            <ReactSVG src={View} />
        </Link>
    );
}

export default viewButton;
