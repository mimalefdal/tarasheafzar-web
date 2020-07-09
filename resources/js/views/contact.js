import React, { Component } from "react";
import FixedNavbar from "../components/navbar-fixed";
import "../../../public/css/contact-us.css";
import ContactCard from "../components/contact-card";

export default class Contact extends Component {
    render() {
        return (
            <div>
                <FixedNavbar contactBtn="hide" />
                <div id="main-bkg">
                    <div className="contact-card-container">
                        <div id="main-title">در دسترس شما هستیم</div>
                        <ContactCard />
                    </div>
                </div>
            </div>
        );
    }
}
