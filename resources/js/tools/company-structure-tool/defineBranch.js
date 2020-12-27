import React from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { BranchForm } from "../../components/forms";
import { t } from "../../utils";

function defineBranch(props) {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.defineBranch")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <BranchForm />
            </div>
        </div>
    );
}

export default defineBranch;
