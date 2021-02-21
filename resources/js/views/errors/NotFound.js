import React from "react";
import { Link } from "react-router-dom";
import { BackButton, HomeButton } from "../../components/buttons";

const _NotFound = () => (
    <div>
        <h1>Page not found</h1>
        <p>Look for something else</p>
        <Link to="/home">Home</Link>
    </div>
);

export default _NotFound;
