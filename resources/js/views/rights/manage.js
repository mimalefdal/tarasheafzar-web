import React, { Component } from "react";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { RightsList, TableList } from "../../components/lists";
import {
    OperationTable,
    RightEntry,
    RightsTable
} from "../../components/tables";
import { t } from "../../utils";

function ManageRights() {
    const rightsTableMap = {
        index: "id",
        title: "title",
        slug: "slug",
        status: "activation"
    };

    const entryOperations = [
        { type: "view", actionType: "link", action: "right/:slug/" },
        { type: "edit", actionType: "callback", action: handleEdit },
        { type: "delete", actionType: "callback", action: handleDelete }
    ];

    function handleDelete(item) {
        console.log("handle DELETE called", item);
    }

    function handleEdit(item) {
        console.log("handle EDIT called", item);
    }

    return (
        <div className="">
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
            <TableList
                dataUrl="/rights"
                tableComponent={<OperationTable className="general-shadow" />}
                entryComponent={<RightEntry />}
                tableMap={rightsTableMap}
                entryOperations={entryOperations}
            />
        </div>
    );
}

export default ManageRights;
