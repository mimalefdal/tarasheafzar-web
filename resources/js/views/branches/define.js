import React from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { BranchForm } from "../../view-components";

function defineBranch(props) {
    return (
        <div className="">
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
