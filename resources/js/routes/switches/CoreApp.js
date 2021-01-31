import React, { Fragment, useContext } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
    StructureManagementPanel,
    EnterpriseManagementPanel,
    StaffManagementPanel
} from ".";
import AppContext from "../../context/appContext";
import StaffContext from "../../context/staffContext";
import { NotFound, Unathorized } from "../../views/errors";
import PanelsHome from "../../views/PanelsHome";
import { DefineRight } from "../../views/rights";
import ManageRights from "../../views/rights/manage";
import { StaffManagementManage } from "../../views/staff-management";
import { REQUIRED_RIGHT } from "../guards/types";

function CoreApp(props) {
    let location = useLocation();

    let staff = useContext(StaffContext);
    // console.log("CoreApp", staff);

    let appContext = useContext(AppContext);
    // console.log("CoreApp", appContext);

    return (
        <TransitionGroup
            component={null}
            appear={true}
            childFactory={child =>
                React.cloneElement(child, {
                    classNames:
                        location.state && location.state.transition
                            ? location.state.transition
                            : "null",
                    timeout:
                        location.state && location.state.timeout
                            ? location.state.timeout
                            : { appear: 0, enter: 0, exit: 0 }
                })
            }
        >
            <CSSTransition
                key={location.key}
                timeout={{}}
                unmountOnExit={true}
                mountOnEnter={false}
            >
                <div className="panel-main-content layout-content">
                    <Switch location={location}>
                        <Route exact path="/home" component={PanelsHome} />
                        <GuardedRoute
                            path="/enterprise-management"
                            component={EnterpriseManagementPanel}
                            meta={{
                                [REQUIRED_RIGHT]:
                                    "access-enterprise-adminstration-panel"
                            }}
                        />

                        <GuardedRoute
                            path="/structure-management"
                            component={StructureManagementPanel}
                            meta={{
                                [REQUIRED_RIGHT]:
                                    "access-structure-management-panel"
                            }}
                        />
                        {/* Temp */}
                        <GuardedRoute
                            exact
                            path={`/rights`}
                            component={ManageRights}
                            meta={{
                                [REQUIRED_RIGHT]:
                                    "access-rights-adminstration-tool"
                            }}
                        />

                        <Route
                            exact
                            path={`/right/add`}
                            component={DefineRight}
                        />

                        <GuardedRoute
                            exact
                            path={`/staff`}
                            component={StaffManagementManage}
                            meta={{
                                [REQUIRED_RIGHT]:
                                    "access-rights-adminstration-tool"
                            }}
                        />
                        {/* Temp END */}
                        <GuardedRoute
                            path="/staff-management"
                            component={StaffManagementPanel}
                            meta={{
                                [REQUIRED_RIGHT]: "access-staff-management"
                            }}
                        />

                        <Route
                            exact
                            path="/unathorized"
                            component={Unathorized}
                            loading="redirecting..."
                        />

                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default CoreApp;
