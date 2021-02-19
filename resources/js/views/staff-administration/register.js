import React, { Component } from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { t } from "../../utils";
import { StaffRegisterForm } from "../../view-components";

export default function register() {
    return (
        <div className="">
            <PageHeaderBar>
                <FormTitle
                    className=""
                    title={t("page-titles.registerStaff")}
                />
            </PageHeaderBar>
            <div className="form-container">
                <StaffRegisterForm />
            </div>
        </div>
    );
}
