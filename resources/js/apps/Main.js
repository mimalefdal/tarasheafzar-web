import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Scrolltotop from "../components/scrolltotop";
import { Welcome, Contact } from "../views/main";

function Main() {
    return (
        <div className="App">
            <BrowserRouter>
                <Scrolltotop />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/Contact" component={Contact} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
