import React, { Component } from "react";

import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { RightAddForm } from "../../components/forms";
import { t } from "../../utils";

function AddRight() {
    return (
        <div className="">
            <PageHeaderBar>
                <FormTitle
                    className=""
                    title={t("custum-titles.defineRight")}
                />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <RightAddForm />
            </div>
        </div>
    );
}

export default AddRight;
