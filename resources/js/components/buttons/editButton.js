import React from "react";
import Edit from "../../assets/images/pencil.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const handleClick = props => () => {
    console.log("Edit Clicked", props);
};

function editButton(props) {
    return (
        <Link
            className={
                "operation-icon-btn  table-operation-icon-btn" + props.className
            }
            style={props.style}
            to={props.target}
        >
            <ReactSVG src={Edit} />
        </Link>
    );
}

export default editButton;
