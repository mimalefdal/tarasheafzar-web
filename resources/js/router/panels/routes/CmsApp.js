import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function CmsApp(props) {
    return (
        <div className="App">
            <div>this is tarasheafzar CMS Application</div>
            <Link to="home">Home</Link>
        </div>
    );
}

export default CmsApp;

if (document.getElementById("cmsApp")) {
    const element = document.getElementById("cmsApp");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<CmsApp {...props} />, element);
}
