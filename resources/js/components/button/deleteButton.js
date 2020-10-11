import React from "react";
import Delete from "../../assets/images/delete.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

function deleteButton(props) {
    return (
        <Link
            className={"operation-icon-btn " + props.className}
            style={props.style}
            to={props.target}
        >
            <ReactSVG src={Delete} />
        </Link>
    );
}

export default deleteButton;
