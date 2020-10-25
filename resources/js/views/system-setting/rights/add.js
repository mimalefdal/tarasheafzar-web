import React, { Component } from "react";
import { PageHeaderBar } from "../../../components";
import { FormTitle } from "../../../components/form-controls";
import { AddRightForm } from "../../../components/forms";
import { t } from "../../../utils";

function AddRight() {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <FormTitle
                    className=""
                    title={t("custum-titles.defineRight")}
                />
            </PageHeaderBar>
            <AddRightForm />
        </div>
    );
}

export default AddRight;
