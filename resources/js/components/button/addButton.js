import React from "react";
import { Link } from "react-router-dom";
import { t } from "../../utils";
import Add from "../../assets/images/add.svg";
import { ReactSVG } from "react-svg";
import { Button } from "@material-ui/core";

function AddButton(props) {
    return (
        <Link
            className={"operation-icon-btn " + props.className}
            style={props.style}
            to={props.target}
        >
            <ReactSVG src={Add} />
        </Link>
    );
}

export default AddButton;
