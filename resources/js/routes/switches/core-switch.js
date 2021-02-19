import React, { Fragment, useContext } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { GuardedRoute } from "react-router-guards";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { StructurePanel, EnterprisePanel, StaffPanel, AccessPanel } from ".";
import AppContext from "../../context/appContext";
import StaffContext from "../../context/staffContext";
import { NotFound, Unathorized } from "../../views/errors";
import { PanelsHome } from "../../views/panels";
import ManageRights from "../../views/rights/manage";
import { StaffManagementManage } from "../../views/staff-management";
import { REQUIRED_RIGHT } from "../guards/types";

function _Switch(props) {
    let location = useLocation();

    let staff = useContext(StaffContext);
    // console.log("_Switch", staff);

    let appContext = useContext(AppContext);
    // console.log("_Switch", appContext);

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
                <div className="panel-main-content">
                    <Switch location={location}>
                        <Route exact path="/home" component={PanelsHome} />
                        <GuardedRoute
                            path="/enterprise"
                            component={EnterprisePanel}
                            meta={{
                                [REQUIRED_RIGHT]: "access-enterprise-panel"
                            }}
                        />

                        <GuardedRoute
                            path="/structure"
                            component={StructurePanel}
                            meta={{
                                [REQUIRED_RIGHT]: "access-structure-panel"
                            }}
                        />

                        <GuardedRoute
                            path="/access"
                            component={AccessPanel}
                            meta={{
                                [REQUIRED_RIGHT]: "access-access-panel"
                            }}
                        />

                        <GuardedRoute
                            path="/staff-management"
                            component={StaffPanel}
                            meta={{
                                [REQUIRED_RIGHT]:
                                    "access-staff-adminstration-panel"
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

export default _Switch;
