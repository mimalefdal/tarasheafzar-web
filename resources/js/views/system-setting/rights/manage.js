import React, { Component } from "react";
import { PageHeaderBar } from "../../../components";
import { ListTitle } from "../../../components/list-controls";
import { RightsList } from "../../../components/lists";
import { t } from "../../../utils";

function ManageRights() {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <ListTitle title={t("custum-titles.rightsListTitle")} />
            </PageHeaderBar>

            <RightsList />
        </div>
    );
}

export default ManageRights;
