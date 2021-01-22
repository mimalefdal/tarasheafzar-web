import React from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { UnitForm } from "../../view-components";

function define(props) {
    return (
        <div className="">
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.defineUnit")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <UnitForm />
            </div>
        </div>
    );
}

export default define;
