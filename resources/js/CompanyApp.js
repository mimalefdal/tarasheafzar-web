import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import PanelsNavBar from "./components/PanelsNavBar";
import Scrolltotop from "./components/ScrollToTop";
import { requireRight, waitOneSecond } from "./routes/guards";
import { Provider } from "react-redux";
import { ApiClient } from "./services";
import StaffContext from "./context/staffContext";
import AppContext from "./context/appContext";
import "./styles/styles.css";
import Layout from "./Layout";
import { Loading } from "./components/feedback";
import { CompanyPanel } from "./routes/switches";
import store from "./utils/redux/store";

function CompanyApp(props) {
    sessionStorage.clear();
    // const [ready, setReady] = useState(false);

    const appContextValue = {
        rights: JSON.parse(props.rights),
        locale: props.locale,
        env: props.env
    };

    const staffContextValue = {
        user: JSON.parse(props.user),
        rights: JSON.parse(props.rights),
        token: JSON.parse(props.user).api_token
    };

    const rights = JSON.parse(props.rights);

    if (rights != null) {
        let rightsArray = [];
        rights.map(right => {
            // sessionStorage.setItem(right.slug, true);
            rightsArray.push(right.slug);
        });
        sessionStorage.setItem("rights", JSON.stringify(rightsArray));
    }
    sessionStorage.setItem("currentLanguage", props.locale);
    sessionStorage.setItem("ENV", props.env);

    ApiClient.get("sanctum/csrf-cookie")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

    return (
        <BrowserRouter>
            <PanelsNavBar />
            <Scrolltotop />
            <Switch>
                <Route exact path="/">
                    <Redirect to="home" />
                </Route>
            </Switch>
            <GuardProvider
                guards={[requireRight, waitOneSecond]}
                loading={Loading}
            >
                <AppContext.Provider value={appContextValue}>
                    <StaffContext.Provider value={staffContextValue}>
                        <Layout>
                            <div className="panel-side-area layout-content">
                                SideArea
                            </div>
                            <div className="responsive-inner-width panel-body ">
                                <CompanyPanel />
                            </div>
                            <div className="panel-side-area layout-content">
                                SideArea
                            </div>
                        </Layout>
                    </StaffContext.Provider>
                </AppContext.Provider>
            </GuardProvider>
        </BrowserRouter>
    );
}

export default CompanyApp;

if (document.getElementById("panels-app")) {
    const element = document.getElementById("panels-app");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <Provider store={store}>
            <CompanyApp {...props} />
        </Provider>,
        element
    );
}
