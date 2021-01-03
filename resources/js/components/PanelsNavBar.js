import React from "react";
import { HomeButton, BackButton } from "./buttons";
import { useLocation } from "react-router-dom";
import { t } from "../utils";
import { useSelector } from "react-redux";
import { navBarTitle } from "../features/redux/navSlice";

function PanelsNavBar() {
    let location = useLocation();
    const title = useSelector(navBarTitle);
    return (
        <div className="panels-nav-bar">
            <div className="nav-bar-area responsive-inner-width">
                {location.pathname != "/home" && <HomeButton />}

                <div className="flex center" style={{ flexGrow: "1" }}>
                    <p className="nav-title"> {title} </p>
                </div>
                {location.pathname != "/home" && <BackButton />}
            </div>
        </div>
    );
}

export default PanelsNavBar;
