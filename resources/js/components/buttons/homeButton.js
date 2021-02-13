import React from "react";
import { Link, useLocation } from "react-router-dom";
import { t } from "../../utils";
import Home from "../../assets/images/house.svg";
import { ReactSVG } from "react-svg";
import { Button } from "@material-ui/core";

function HomeButton(props) {
    let location = useLocation();
    // location.state && console.log("from HomeButton", location.state);
    return (
        <button className="nav-btn" style={props.style}>
            <Link
                replace
                to={{
                    pathname: "/home",
                    state: {
                        transition: "slide-right",
                        timeout: { appear: 1000, enter: 1000, exit: 1000 }
                    }
                }}
            >
                <ReactSVG src={Home} />
            </Link>
        </button>
    );
}

export default HomeButton;
