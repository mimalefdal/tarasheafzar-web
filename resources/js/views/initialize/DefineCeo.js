import React, { useEffect, useState } from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { StaffRegisterForm } from "../../components/forms";
import { ApiClient } from "../../services";
import { t } from "../../utils";

function DefineCeo(props) {
    let token = sessionStorage.getItem("StaffAccessToken");
    let headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        ApiClient.get("/initialize/status", {
            headers: headers,
            params: { targetFunction: "defineCeo" }
        })
            .then(response => {
                // console.log(response);
                setStatus(response.data);
                setLoading(false);
            })
            .catch(error => {
                // console.log(error.response);
                setLoading(false);
            });
    }, []);

    return (
        <div className="page-content responsive-inner-width">
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
        </div>
    );
}

export default DefineCeo;
