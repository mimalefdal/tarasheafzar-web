import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Contact from "../views/contact";
import Index from "../views";
import Scrolltotop from "./scrolltotop";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Scrolltotop />
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/Contact" component={Contact} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
