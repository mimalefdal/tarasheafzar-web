import React from "react";
import Delete from "../../assets/images/delete.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

function deleteButton({ target = "#", ...props }) {
    return (
        <button
            className={"operation-icon-btn " + props.className}
            style={props.style}
            onClick={props.onClick && props.onClick}
        >
            {/* <ReactSVG src={Delete} /> */}
            <DeleteIcon />
        </button>
        // <Link
        //     className={"operation-icon-btn " + props.className}
        //     style={props.style}
        //     to={target}
        // >
        //     {/* <ReactSVG src={Delete} /> */}
        //     <DeleteIcon />
        // </Link>
    );
}

export default deleteButton;
