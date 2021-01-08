import React, { Component } from "react";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import { StaffRegisterForm } from "../../components/forms";
import { t } from "../../utils";

export default function register() {
    return (
        <div className="">
            <PageHeaderBar>
                <FormTitle
                    className=""
                    title={t("custum-titles.registerStaff")}
                />
            </PageHeaderBar>
            <div className="form-container">
                <StaffRegisterForm />
            </div>
        </div>
    );
}
