import React, { Component } from "react";
import "../../../../public/css/contact-us.css";
import FixedNavbar from "../../components/main/navbar-fixed";
import ContactCard from "../../components/main/contact-card";

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
