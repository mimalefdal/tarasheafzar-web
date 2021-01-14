import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import PanelsNavBar from "./components/PanelsNavBar";
import Scrolltotop from "./components/ScrollToTop";
import { requireRight, waitOneSecond } from "./routes/guards";
import { FormLoadingData } from "./components/form-controls";
import CoreApp from "./routes/switches/CoreApp";
import { Provider } from "react-redux";
import store from "./features/redux/store";
import { ApiClient } from "./services";
import StaffContext from "./context/staffContext";
import AppContext from "./context/appContext";
import "./styles/styles.css";
import Layout from "./Layout";

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

    // sessionStorage.setItem("StaffAccessToken", token);

    // ApiClient.get("sanctum/csrf-cookie")
    //     .then(response => {
    //         // console.log(response);
    //         setReady(true);
    //     })
    //     .catch(error => {
    //         console.log("");
    //         console.log(error.response);
    //     });

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
                loading={FormLoadingData}
            >
                <AppContext.Provider value={appContextValue}>
                    <StaffContext.Provider value={staffContextValue}>
                        <Layout>
                            <div className="panel-side-area layout-content">
                                SideArea
                            </div>
                            <div className="responsive-inner-width panel-body ">
                                <CoreApp />
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