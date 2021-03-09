import React, { useState } from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { StaffRegisterForm } from "../../view-components";

function _define(props) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.registerStaff")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                {!loading && (
                    <StaffRegisterForm
                        // preset="ceo"
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

export default _define;
