import React from "react";
import View from "../../assets/images/visibility.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
function viewButton({ target = "#", ...props }) {
    return target == "#" ? (
        <button
            className={"operation-icon-btn " + props.className}
            style={props.style}
            onClick={props.onClick && props.onClick}
        >
            <VisibilityIcon />
        </button>
    ) : (
        <Link
            className={"operation-icon-btn " + props.className}
            style={props.style}
            to={target}
        >
            {/* <ReactSVG src={Edit} /> */}
            <VisibilityIcon />
        </Link>
    );
}

export default viewButton;
