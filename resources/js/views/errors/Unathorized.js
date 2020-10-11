import React from "react";
import { Link } from "react-router-dom";

const Unathorized = () => (
    <div>
        <h3>Unathorized</h3>
        <h2>Sorry, you are not allowed to access this panel</h2>
        <p>Please wait for redirecting ...</p>
        <Link to="/home">Home</Link>
    </div>
);

export default Unathorized;
