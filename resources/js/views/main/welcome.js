import React, { Component } from "react";
import StickyWelcome from "../../components/main/StickyWelcome";

export default class Welcome extends Component {
    render() {
        return (
            <div className="App">
                <StickyWelcome />
                <div className="full-height">example div</div>
            </div>
        );
    }
}
