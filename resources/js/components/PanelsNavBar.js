import React from "react";
import { HomeButton, BackButton } from "./buttons";
import { useLocation } from "react-router-dom";
import { t } from "../utils";

function PanelsNavBar() {
    let location = useLocation();
    // console.log(useLocation());
    return (
        <div className="panels-nav-bar">
            <div className="nav-bar-area responsive-inner-width">
                {location.pathname != "/home" && <HomeButton />}
                <div style={{ flexGrow: "1" }}>
                    {location.pathname == "/home" && (
                        <h3>{t("custum-titles.welcomePanelHome")} </h3>
                    )}
                </div>
                {location.pathname != "/home" && <BackButton />}
            </div>
        </div>
    );
}

export default PanelsNavBar;
