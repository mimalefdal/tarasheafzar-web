import React from "react";
import { HomeButton, BackButton } from "./buttons";
import { Link, useLocation } from "react-router-dom";
import { t } from "../utils";
import { useSelector } from "react-redux";
import { navBarTitle } from "../utils/redux/navSlice";

function PanelsNavBar() {
    let location = useLocation();
    const title = useSelector(navBarTitle);
    // console.log(title);
    return (
        <div className="panels-nav-bar">
            <div className="nav-bar-area responsive-inner-width">
                {location.pathname != "/home" && <HomeButton />}

                <div
                    className="flex"
                    style={{ flexGrow: "1", marginInline: "1rem" }}
                >
                    {title != undefined &&
                        (typeof title == "string" ? (
                            <p className="nav-title"> {title} </p>
                        ) : (
                            <Link className="nav-title" to={title.link}>
                                {title.text}
                            </Link>
                        ))}
                </div>
                {location.pathname != "/home" && <BackButton />}
            </div>
        </div>
    );
}

export default PanelsNavBar;
