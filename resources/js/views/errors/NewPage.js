import React from "react";
import { Link } from "react-router-dom";
import { BackButton, HomeButton } from "../../components/button";

function NewPage(props) {
    return (
        <div>
            <h2>New Page</h2>
            <h3>{props.title}</h3>
            <HomeButton />
            <BackButton />
        </div>
    );
}

export default NewPage;
