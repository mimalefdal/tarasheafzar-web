import React, { Component } from "react";
import StickyWelcome from "../components/StickyWelcome";

export default class Index extends Component {
    render() {
        return (
            <div className="App">
                <StickyWelcome />
                <div className="full-height">example div</div>
            </div>
        );
    }
}
