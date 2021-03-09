import React, { useContext, useEffect, useState } from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import StaffContext from "../../context/staffContext";
import { ApiClient, GetInitializeStatus } from "../../services";
import { t } from "../../utils";
import { StaffRegisterForm } from "../../view-components";

function DefineCeo(props) {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);

    const token = useContext(StaffContext).token;
    const statusParam = { targetFunction: "defineCeo" };

    useEffect(() => {
        GetInitializeStatus(
            statusParam,
            token,
            response => {
                setStatus(response.data);
                setLoading(false);
            },
            error => {
                setLoading(false);
            }
        );
    }, []);

    return (
        <>
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.registerCEO")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                {!loading && (
                    <StaffRegisterForm
                        preset="ceo"
                        showAlert={
                            status.requestedStatus
                                ? {
                                      show: true,
                                      type: "warning",
                                      message: status.message
                                  }
                                : null
                        }
                    />
                )}
            </div>
        </>
    );
}

export default DefineCeo;
