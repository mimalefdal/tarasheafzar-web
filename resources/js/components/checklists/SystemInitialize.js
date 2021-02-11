import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "../../styles/checklists.css";
import { t } from "../../utils";
import {
    ChecklistHeaderTripleColumn,
    ChecklistRowTripleColumn
} from "../checklist-controls";
import {
    GetInitializeStatus,
    InitializeLicence,
    InitiateSystem
} from "../../services";
import StaffContext from "../../context/staffContext";
import { error } from "jquery";
import { installFeatures } from "../../services/initialize-service";

function SystemInitialize(props) {
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const token = useContext(StaffContext).token;

    useEffect(() => {
        GetInitializeStatus(
            {},
            token,
            response => {
                // console.log(
                //     "SystemInitialize:GetInitializeStatus:RESPONSE",
                //     response
                // );
                setStatus(response.data);
                setLoading(false);
            },
            error => {
                // console.log(
                //     "SystemInitialize:GetInitializeStatus:ERROR",
                //     error
                // );
                setLoading(false);
            }
        );
    }, []);

    const validateLicence = () => {
        // console.log("Initialize Licence");
        setLoading(true);

        InitializeLicence(
            [],
            token,
            response => {
                console.log("validateLicence:response", response);
                setStatus(response.data.data);
                setLoading(false);
            },
            error => {
                console.log("validateLicence:error", error);
                setLoading(false);
            }
        );
    };

    const initiateSystem = () => {
        // console.log("Initialize System");
        InitiateSystem(
            token,
            response => {
                setStatus(response.data.data);
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    };

    return (
        <div className="list-container ">
            <div className="list-body  ">
                <table>
                    <thead>
                        <ChecklistHeaderTripleColumn />
                    </thead>
                    <tbody>
                        <ChecklistRowTripleColumn
                            loadstate={loading}
                            itemTitle="نصب لایسنس"
                            itemStatus={status && status.installLicence}
                            itemComment=""
                            callback={validateLicence}
                            label={t("buttons.InstallLicence")}
                        />
                        <ChecklistRowTripleColumn
                            loadstate={loading}
                            itemTitle="نصب اولیه امکانات و ابزار"
                            itemStatus={status && status.initiateSystem}
                            prerequisite={status && status.installLicence}
                            itemComment=""
                            callback={initiateSystem}
                            label={t("buttons.InstallFeatures")}
                        />
                        <ChecklistRowTripleColumn
                            loadstate={loading}
                            itemTitle="ثبت اکانت مدیرعامل"
                            itemStatus={status && status.defineCeo}
                            prerequisite={
                                status &&
                                status.installLicence &&
                                status.initiateSystem
                            }
                            itemComment=""
                            target="ceo"
                            label={t("buttons.InitializeCEO")}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SystemInitialize;
