import React, { Component } from "react";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { RightsList } from "../../components/lists";
import { t } from "../../utils";

function ManageRights() {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <ListTitle
                    title={t("custum-titles.rightsListTitle")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="right/add"
                        />
                    }
                />
            </PageHeaderBar>

            <RightsList />
        </div>
    );
}

export default ManageRights;
