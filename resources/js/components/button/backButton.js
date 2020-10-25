import React from "react";
import { useHistory } from "react-router-dom";
import Back from "../../assets/images/left-arrow.svg";
import { ReactSVG } from "react-svg";

function BackButton(props) {
    let history = useHistory();
    return (
        <button
            className="nav-btn"
            style={props.style}
            onClick={() => history.goBack()}
        >
            <ReactSVG src={Back} />
        </button>
    );
}

export default BackButton;
