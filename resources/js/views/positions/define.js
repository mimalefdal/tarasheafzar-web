import React from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { PositionForm, UnitForm } from "../../view-components";

function define(props) {
    return (
        <div className="">
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.definePosition")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <PositionForm />
            </div>
        </div>
    );
}

export default define;
