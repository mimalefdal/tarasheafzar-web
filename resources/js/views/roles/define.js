import React from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { RoleForm } from "../../view-components";

function _define(props) {
    return (
        <>
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.defineRole")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <RoleForm />
            </div>
        </>
    );
}

export default _define;
