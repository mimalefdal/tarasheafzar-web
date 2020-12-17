import React from "react";
import { Link } from "react-router-dom";
import { t } from "../../utils";
import Home from "../../assets/images/house.svg";
import { ReactSVG } from "react-svg";
import { Button } from "@material-ui/core";

function HomeButton(props) {
    return (
        <button className="nav-btn" style={props.style}>
            <Link to="/home">
                <ReactSVG src={Home} />
            </Link>
        </button>
    );
}

export default HomeButton;
