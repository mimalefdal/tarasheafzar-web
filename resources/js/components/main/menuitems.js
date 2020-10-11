import React, { Component } from "react";
import "../../../../public/css/menuitems-web.css";

export default class Menuitems extends Component {
    render() {
        return (
            <div id="items-container" className="items-container">
                <a className="menu-item" href="/">
                    خانه
                </a>
            </div>
        );
    }
}
