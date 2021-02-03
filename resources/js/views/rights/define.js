import React, { Component } from "react";

import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { RightForm } from "../../view-components";

function define() {
    return (
        <div className="">
            <PageHeaderBar>
                <FormTitle
                    className=""
                    title={t("custum-titles.defineRight")}
                />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                <RightForm />
            </div>
        </div>
    );
}

export default define;
