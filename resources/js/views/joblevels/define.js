import React from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { JoblevelForm } from "../../view-components";
import { NewPage } from "../errors";

function _view(props) {
    return (
        <>
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.defineJoblevel")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <JoblevelForm />
            </div>
        </>
    );
}

export default _view;
