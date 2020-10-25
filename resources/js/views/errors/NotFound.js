import React from "react";
import { Link } from "react-router-dom";
import { HomeButton } from "../../components/button";

const NotFound = () => (
    <div>
        <h1>Page not found</h1>
        <p>Look for something else</p>
        <Link to="/home">Home</Link>
        <HomeButton />
        <BackButton />
    </div>
);

export default NotFound;
