import React, { Component } from "react";
import "../../../../public/css/webmenu.css";
import Menuitems from "./menuitems";

export default class WebMenu extends Component {
    render() {
        return (
            <div id="menu" className="main-menu-container">
                <div id="menu-items" className="menu-items">
                    <Menuitems />
                </div>
            </div>
        );
    }
}
