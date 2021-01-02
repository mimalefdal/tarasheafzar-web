import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Back from "../../assets/images/left-arrow.svg";
import { ReactSVG } from "react-svg";

function BackButton(props) {
    let history = useHistory();
    // let location = useLocation();
    // console.log("from BackButton", location.state && location.state.prev);
    // console.log("from BackButton", history.location);

    return (
        <button
            className="nav-btn"
            style={props.style}
            onClick={() => history.go(-1)}
        >
            <ReactSVG src={Back} />
        </button>
    );
}

export default BackButton;
