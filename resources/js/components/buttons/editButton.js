import React from "react";
import Edit from "../../assets/images/pencil.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const handleClick = props => () => {
    console.log("Edit Clicked", props);
};

function editButton({ target = "#", ...props }) {
    return target == "#" ? (
        <button
            className={"operation-icon-btn " + props.className}
            style={props.style}
            onClick={props.onClick}
        >
            <EditIcon />
        </button>
    ) : (
        <Link
            className={"operation-icon-btn " + props.className}
            style={props.style}
            to={target}
        >
            {/* <ReactSVG src={Edit} /> */}
            <EditIcon />
        </Link>
    );
}

export default editButton;
