import React from "react";
import { Link } from "react-router-dom";
import { BackButton, HomeButton } from "../../components/buttons";

function _NewPage(props) {
    console.log("NewPage Title is ", props.title);
    return (
        <div>
            <h2>New Page</h2>
            <h3>{props.title}</h3>
            {/* <HomeButton />
            <BackButton /> */}
        </div>
    );
}

export default _NewPage;
