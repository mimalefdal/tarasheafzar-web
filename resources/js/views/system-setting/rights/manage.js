import React, { Component } from "react";
import { PageHeaderBar } from "../../../components";
import { AddButton } from "../../../components/button";
import { ListTitle } from "../../../components/list-controls";
import { RightsList } from "../../../components/lists";
import { t } from "../../../utils";

function ManageRights() {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <ListTitle
                    title={t("custum-titles.rightsListTitle")}
                    btnSet={
                        <AddButton
                            className="list-operation-btn"
                            style={{ width: "35px" }}
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
