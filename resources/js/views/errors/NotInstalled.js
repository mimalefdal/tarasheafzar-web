import React from "react";
import { Link } from "react-router-dom";
import { BackButton, HomeButton } from "../../components/buttons";

const _NotInstalled = () => (
    <div>
        <h1>Feature Not Installed</h1>
        <p>Please ask system manager of your company</p>
        <Link to="/home">Home</Link>
    </div>
);

export default _NotInstalled;
