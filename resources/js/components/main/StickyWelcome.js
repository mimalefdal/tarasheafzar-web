import React, { Component } from "react";

import "../../../../public/css/sticky-welcome.css";
import logo from "../../../../public/image/talogo-nocap.png";
import data from "../../../../storage/app/public/company.json";
import { Link } from "react-router-dom";
import WebMenu from "./webmenu";

export default class StickyWelcome extends Component {
    // state = {};

    constructor(props) {
        super(props);
        this.state = { stuckState: false };

        this.arrowDownClicked = this.arrowDownClicked.bind(this);
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "/js/title-ribbon.js";
        script.async = true;

        document.body.appendChild(script);

        window.onscroll = function() {
            // console.log("scroll-Top = ", document.documentElement.scrollTop);
            scrollFunction(data["company-info"].name);
        };
    }

    render() {
        const classNameStucked = this.state.stuckState ? "stucked" : "";
        const classNameHidden = this.state.stuckState ? "hidden" : "";

        return (
            <div
                id="title-section"
                className={"sticky-top title-section " + classNameStucked}
            >
                <div id="main-container">
                    <img
                        id="company-logo"
                        className={"logo-main " + classNameHidden}
                        src={logo}
                        alt="company logo"
                    />
                    <div
                        className={"pre-title " + classNameHidden}
                        id="welcome-title"
                    >
                        خوش آمدید
                    </div>
                    <div
                        id="title-ribbon"
                        className={"title-ribbon " + classNameStucked}
                    >
                        <div className="btn-box">
                            <svg
                                onClick={this.expandMenu}
                                id="menuexpander"
                                className="expander"
                                viewBox="0 0 515.555 515.555"
                            >
                                <path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"></path>
                                <path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
                                <path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
                            </svg>

                            <svg
                                onClick={this.collapseMenu}
                                id="menu-collapser"
                                className="collapser hidden dimmed"
                                viewBox="0 0 515.555 515.555"
                            >
                                <g>
                                    <g>
                                        <path
                                            d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                L284.286,256.002z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div id="company-info">
                            <div
                                id="company-name"
                                className={"large-title " + classNameStucked}
                            >
                                {data["company-info"].name}
                            </div>

                            <WebMenu />
                        </div>
                        <div className="btn-box">
                            <Link to="/Contact" style={{ display: "flex" }}>
                                <svg
                                    onClick={this.showContacts}
                                    id="contact-btn"
                                    className="expander"
                                    viewBox="0 0 515.555 515.555"
                                >
                                    <path d="m407 .5h-302c-57.898438 0-105 47.101562-105 105v162.171875c0 46.199219 30.332031 86.4375 74.285156 99.316406l50.710938 50.714844c2.816406 2.8125 6.628906 4.394531 10.609375 4.394531 3.976562 0 7.792969-1.582031 10.605469-4.394531l46.519531-46.523437h214.269531c57.898438 0 105-47.101563 105-105v-160.679688c0-57.898438-47.101562-105-105-105zm75 265.679688c0 41.355468-33.644531 75-75 75h-220.480469c-3.976562 0-7.792969 1.582031-10.605469 4.394531l-40.308593 40.308593-42.929688-42.929687c-1.925781-1.925781-4.339843-3.292969-6.984375-3.949219-32.789062-8.160156-55.691406-37.492187-55.691406-71.332031v-162.171875c0-41.355469 33.644531-75 75-75h302c41.355469 0 75 33.644531 75 75zm0 0" />
                                    <path d="m351.242188 144.328125h-190.484376c-8.285156 0-15 6.71875-15 15 0 8.285156 6.714844 15 15 15h190.484376c8.285156 0 15-6.714844 15-15 0-8.28125-6.714844-15-15-15zm0 0" />
                                    <path d="m351.242188 197.351562h-190.484376c-8.285156 0-15 6.714844-15 15 0 8.285157 6.714844 15 15 15h190.484376c8.285156 0 15-6.714843 15-15 0-8.285156-6.714844-15-15-15zm0 0" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div
                        id="company-description"
                        className={"company-description   " + classNameHidden}
                    >
                        {data["company-info"].description}
                    </div>
                </div>

                <div id="arrow-container">
                    <svg
                        id="arrow-down"
                        viewBox="0 0 284.929 284.929"
                        onClick={this.arrowDownClicked}
                    >
                        <g>
                            <g>
                                <path
                                    d="M135.899,167.877c1.902,1.902,4.093,2.851,6.567,2.851s4.661-0.948,6.562-2.851L282.082,34.829
			c1.902-1.903,2.847-4.093,2.847-6.567s-0.951-4.665-2.847-6.567L267.808,7.417c-1.902-1.903-4.093-2.853-6.57-2.853
			c-2.471,0-4.661,0.95-6.563,2.853L142.466,119.622L30.262,7.417c-1.903-1.903-4.093-2.853-6.567-2.853
			c-2.475,0-4.665,0.95-6.567,2.853L2.856,21.695C0.95,23.597,0,25.784,0,28.262c0,2.478,0.953,4.665,2.856,6.567L135.899,167.877z"
                                />
                                <path
                                    d="M267.808,117.053c-1.902-1.903-4.093-2.853-6.57-2.853c-2.471,0-4.661,0.95-6.563,2.853L142.466,229.257L30.262,117.05
			c-1.903-1.903-4.093-2.853-6.567-2.853c-2.475,0-4.665,0.95-6.567,2.853L2.856,131.327C0.95,133.23,0,135.42,0,137.893
			c0,2.474,0.953,4.665,2.856,6.57l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854l133.054-133.046
			c1.902-1.903,2.847-4.093,2.847-6.565c0-2.474-0.951-4.661-2.847-6.567L267.808,117.053z"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        );
    }

    showContacts() {
        console.log("showContacts Called");
    }

    expandMenu() {
        console.log("expand menu Clicked");
        toggle_mainpage_menu();
    }

    collapseMenu() {
        console.log("collapse menu Clicked");
        toggle_mainpage_menu();
    }
    arrowDownClicked() {
        // console.log("arrowdown Clicked menu to");
        // this.setState({ stuckState: !this.state.stuckState });

        changeRibbonState("stuck", data["company-info"].name);
    }
}
